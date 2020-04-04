from datetime import datetime

from flask_jwt import current_identity

from quarantairbnb.models import RequestHistory, db, OfferHistory


def get_request_data(request):
    """
    Gets the data from the request
    """
    # https://stackoverflow.com/questions/10434599/how-to-get-data-received-in-flask-request/25268170
    data = request.form.to_dict() if request.form else request.get_json()
    if not data:
        return {}
    return data


def log_request_history(entity_id, description):
    return log_history(RequestHistory, "request_id", entity_id, description)


def log_offer_history(entity_id, description):
    return log_history(OfferHistory, "offer_id", entity_id, description)


def log_history(entity_type, column_name, entity_id, description):
    """
    Log into the history table for an entity
    :param entity_type:
    :param column_name:
    :param entity_id:
    :param description:
    :return:
    """
    history_item = entity_type(
        timestamp=datetime.utcnow(),
        description=description,
        user_id=current_identity.id
    )
    setattr(history_item, column_name, entity_id)
    db.session.add(history_item)
    db.session.commit()
    return history_item


def is_admin():
    return current_identity.role.name == "admin"
