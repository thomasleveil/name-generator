import requests
import json
import boto3


# Simple validation by checking if all endpoints return code 200
# Obviously these validation can get complex as needed by leveraging 
# some of the tools used for this purpose
# e.g. https://github.com/FutureSharks/invokust or
# running lambda as a container and leverging any of the well known 
# command line tools e.g. wrk, ab
def validate(url, context_paths):

    for path in context_paths:
        resp = requests.get(url+path)
        print (str(resp.status_code) + " - " + url+path)
        if resp.status_code != 200:
            return False
    
    return True


# Reporting validation status by calling CodeDeploy api
# and passing appropriate status
def report_status(deployment_id, hook_exec_id, status):
    client = boto3.client('codedeploy')

    response = client.put_lifecycle_event_hook_execution_status(
        deploymentId=deployment_id,
        lifecycleEventHookExecutionId=hook_exec_id,
        status=status
    )


def lambda_handler(event, context):
    
    # Setting test taskset url (via test port)
    # Ideally these values should be externalized (e.g. passed via Lambda env vars)
    URL = "http://tf-lb-2021110609264334060000000b-792189563.us-east-1.elb.amazonaws.com:81"
    CONTEXT_PATHS = [
        "/fr", 
        "/docker",
        ]    
        
    print("---")    
    print(URL)
    print(CONTEXT_PATHS)
    print("---")
    print(json.dumps(event, indent=4, sort_keys=True, default="str"))
    print("---")    
    
    # Checking validation status and calling report function accordingly
    if validate(URL, CONTEXT_PATHS):
        report_status(
            deployment_id=event["DeploymentId"], 
            hook_exec_id=event["LifecycleEventHookExecutionId"],
            status="Succeeded"
            )
        print ("Validation tests succeeded")
    else:
        report_status(
            deployment_id=event["DeploymentId"], 
            hook_exec_id=event["LifecycleEventHookExecutionId"],
            status="Failed"
            )
        print ("Validation tests failed")
        
    print ("---")
    