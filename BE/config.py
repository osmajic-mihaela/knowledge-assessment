
class ConfigSQL(object):
    SQLALCHEMY_DATABASE_URI = "postgresql://postgres:ftn@localhost/sotis_db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ConfigGPT(object):
    organization = "openai organization "
    api_key = "openai api key"
