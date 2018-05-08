# clickstream
AWS based clickstream demo leveraging Snowplow concepts

It is assume you have already created a HostedZone in Route53 (ie your domain name) and a wildcard cert for that domain name in ACM. These may take awhile to be validated and not part of the script. These will need to be passed in as params to the Cloudformation script as per below See:
https://docs.aws.amazon.com/acm/latest/userguide/gs-acm-validate-dns.html


aws cloudformation create-stack \
  --region eu-west-1 \
  --stack-name rhysc-clickstream-cf-eu-west-1 \
  --template-body file:///Users/rhysc/src/clickstream/clickstream-cf.yml \
  --parameters ParameterKey=HostedZone,ParameterValue=rhysc.io,ParameterKey=AcmSslId,ParameterValue=d0bf32cc-6948-4687-bdfa-aecaacf88cc3,ParameterKey=DnsPrefix,ParameterValue=clickstream
  

Need to:
- swap out the click tracking url in the index.html to used the TrackingDomain output param
- upload the 'i' pixel (and optionally the modified index.html) to the s3 bucket using the SiteBucketName  output param

`aws s3 cp i s3://{websitecontentbucket}/i --acl public-read` 

`aws s3 cp index.html s3://{websitecontentbucket}/index.html --acl public-read`  

`i` pixel image originally sourced from:
https://github.com/snowplow/snowplow/wiki/2-upload-the-tracking-pixel
