from celery import Celery

from quarantairbnb.app import app
from quarantairbnb.models import Request, Offer, db, CancelledMatch


def init_celery(flask_app):
    if 'CELERY_BROKER_URL' in flask_app.config and flask_app.config['CELERY_BROKER_URL']:
        celery = Celery(flask_app.name, broker=flask_app.config['CELERY_BROKER_URL'])
        # celery.conf.result_backend = flask_app.config['CELERY_RESULT_BACKEND']
        celery.conf.update(flask_app.config)

        TaskBase = celery.Task
        class ContextTask(TaskBase):
            """Make celery tasks work with Flask flask_app context"""

            def __call__(self, *args, **kwargs):
                with flask_app.app_context():
                    return TaskBase.__call__(self, *args, **kwargs)

        celery.Task = ContextTask
        return celery
    return None


celery = init_celery(app)


@celery.on_after_configure.connect()
def setup_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, match_offers.s(), name='match offers every 30 seconds')


@celery.task()
def match_offers():
    pending_requests = Request.query.filter(Request.state.has(name="approved"))

    def filter_offer_base_on_time(pending_request):
        offers_ids_cancelled_for_this_request = [match.offer_id for match in
                                                 CancelledMatch.query.filter_by(request_id=pending_request.id)]

        offers_to_be_matched = Offer.query \
            .filter(Offer.state.has(name="approved")) \
            .filter(Offer.start_date <= pending_request.start_date) \
            .filter(Offer.end_date >= pending_request.end_date)

        if offers_ids_cancelled_for_this_request:
            offers_to_be_matched = offers_to_be_matched \
                .filter(~Offer.id.in_(offers_ids_cancelled_for_this_request)).all()

        return offers_to_be_matched

    def squared_distance(req: Request, offer: Offer):
        request_coordinates = (req.latitude, req.longitude)
        offer_coordinates = (offer.latitude, offer.longitude)

        return sum([(request_coordinates[i] - offer_coordinates[i]) ** 2 for i in range(len(request_coordinates))])

    for pending_request in pending_requests:  # type: Request
        pending_offers = filter_offer_base_on_time(pending_request)

        if pending_offers:
            distance_to_offer = {
                squared_distance(pending_request, pending_offer): pending_offer for pending_offer in pending_offers
            }

            minimum_distance = min(list(distance_to_offer.keys()))
            matched_offer = distance_to_offer[minimum_distance]  # type: Offer

            # Matching offer to request
            pending_request.offer_id = matched_offer.id
            matched_offer.request_id = pending_request.id

            # Set both to matched state
            pending_request.state_id = pending_request.state.next_state_id
            matched_offer.state_id = matched_offer.state.next_state_id

            db.session.add_all([pending_request, matched_offer])
            db.session.commit()
