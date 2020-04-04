# Quarantairbnb

To run the app production-style:

```bash
gunicorn wsgi:app
```

## Login endpoint

```
http://localhost:5000/api/auth/login
```

With creds:

```json
{
	"email": "admin@op.pl",
	"password": "1234"
}
```

## Backend Development

Make sure you get postgres running locally, for Docker use:

```bash
docker run -d -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=quarant --name quarant -p 5432:5432 postgres:11-alpine
```

Use the things from `.env` to get it running:

```
source .env
```

Running:

```
python manage.py runserver
```


## Migrating

After setting everything up and using the right DB, use the manage script for 
everything to be setup in the DB.

### New model / changes
When you want to update your model, adding a new migration:

```
python manage.py db migrate
```

### Applying changes to the DB

```
python manage.py db upgrade
```