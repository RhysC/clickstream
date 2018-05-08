The `clickstream-cf.yml` file can be applied in the AWS console and will asusme the region that it is run in.

It is assume you have already created a HostedZone in Route53 (ie your domain name) and a wildcard cert for that domain name in ACM. These may take awhile to be validated and not part of the script. See:
https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html


aws cloudformation create-stack \
  --region eu-west-1 \
  --stack-name rhys-cf-s3-test8 \
  --template-body file:///Users/rhysc/src/vgw/spikes/clickstream-sample/clickstream-cf.yml \
  --parameters ParameterKey=HostedZone,ParameterValue=rhysc.io,ParameterKey=AcmSslId,ParameterValue=d0bf32cc-6948-4687-bdfa-aecaacf88cc3,ParameterKey=DnsPrefix,ParameterValue=rhys-cf-s3-test8
  

Need to:
- swap out the click tracking url in the index.html to used the TrackingDomain output param
- upload the 'i' pixel (and optionally the modified index.html) to the s3 bucket using the SiteBucketName  output param


`i` pixel image originally sourced from:
https://github.com/snowplow/snowplow/wiki/2-upload-the-tracking-pixel