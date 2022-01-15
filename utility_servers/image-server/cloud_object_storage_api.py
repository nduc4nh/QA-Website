import ibm_boto3
from ibm_botocore.client import Config, ClientError


class COS:
    def __init__(self,
                 cos_endpoint,
                 cos_api_key,
                 cos_instance_id) -> None:
        # Constants for IBM COS values
        # Current list avaiable at https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints
        self.COS_ENDPOINT = cos_endpoint
        # eg "W00YixxxxxxxxxxMB-odB-2ySfTrFBIQQWanc--P3byk"
        self.COS_API_KEY_ID = cos_api_key
        # eg "crn:v1:bluemix:public:cloud-object-storage:global:a/3bf0d9003xxxxxxxxxx1c3e97696b71c:d6f04d83-6c4f-4a62-a165-696756d63903::"
        self.COS_INSTANCE_CRN = cos_instance_id
        self.cos = None

    def get_instance(self):
        self.cos = ibm_boto3.resource("s3",
                                      ibm_api_key_id=self.COS_API_KEY_ID,
                                      ibm_service_instance_id=self.COS_INSTANCE_CRN,
                                      config=Config(signature_version="oauth"),
                                      endpoint_url=self.COS_ENDPOINT
                                      )
        return self
    
    def get_buckets(self):
        print("Retrieving list of buckets")
        try:
            buckets = self.cos.buckets.all()
            for bucket in buckets:
                print("Bucket Name: {0}".format(bucket.name))
        except ClientError as be:
            print("CLIENT ERROR: {0}\n".format(be))
        except Exception as e:
            print("Unable to retrieve list buckets: {0}".format(e))
    
    def create_text_file(self,bucket_name, item_name, file_text):
        print("Creating new item: {0}".format(item_name))
        try:
            self.cos.Object(bucket_name, item_name).put(
                Body=file_text
            )
            print("Item: {0} created!".format(item_name))
        except ClientError as be:
            print("CLIENT ERROR: {0}\n".format(be))
            return None
        except Exception as e:
            print("Unable to create text file: {0}".format(e))
            return None
    
    def create_bucket(self,bucket_name):
        print("Creating new bucket: {0}".format(bucket_name))
        try:
            self.cos.Bucket(bucket_name).create(
                CreateBucketConfiguration={
                    "LocationConstraint":"jp-tok-smart"
                }
            )
            print("Bucket: {0} created!".format(bucket_name))
        except ClientError as be:
            print("CLIENT ERROR: {0}\n".format(be))
            return None
        except Exception as e:
            print("Unable to create bucket: {0}".format(e))
            return None

    def get_item(self,bucket_name, item_name):
        print("Retrieving item from bucket: {0}, key: {1}".format(bucket_name, item_name))
        try:
            file = self.cos.Object(bucket_name, item_name).get()
            content = file["Body"].read()
            print("File Contents: {0}".format(content))
            return content
        except ClientError as be:
            print("CLIENT ERROR: {0}\n".format(be))
            return None
        except Exception as e:
            print("Unable to retrieve file contents: {0}".format(e))
            return None
 