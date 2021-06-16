<h1> AWS Lambda Performance Optimizations</h1>
<p>
    Among the biggest issues we – a 100% serverless company – have faced, are AWS Lambda cold starts, 
    the extra time it takes for a function to execute when it hasn’t recently been invoked. 
</p>
<p>
    <strong>"Keep Lambda warm"</strong> - one of the most important topics in optimizations of Lambdas 
</p>

<article>
    <strong>Cold starts can be a killer to Lambda performance</strong>, especially if you’re developing a customer-facing application that needs to operate in real time. 
    They happen because if your Lambda is not already running, AWS needs to deploy your code and spin up a new container before the request can begin. 
    This can mean a request takes much longer to execute, and only when the container is ready can your lambda start running.
</article>
<hr/>
<img src="https://cdn-media-1.freecodecamp.org/images/1*HsUccdkDffywiUjM7AYdFw.png"/>
<hr/>
<article>
    The serverless cold start is the first time your code is being executed by your cloud provider, and requires it to be downloaded, 
    containerised, booted, and primed to be run. This can add significant overhead — up to 1.5s of latency. <br/><br/>
    <strong>But good news:</strong> these cold starts are expected to be outliers, only affecting 5% of executions. 
    So, while they don’t happen all the time, they are important to think about when designing your application.
</article>
<h2> Get Lambdas out of VPC </h2>
<article>
    Unless it’s really necessary (for instance, to access resources within a VPC) try to get your Lambdas running outside of your VPC, 
    as the attachment of the ENI interfaces can have a huge impact on Lambda cold start times. <br/>
    In these experiments run by Alessandro Morandi, he found that a Lambda with 3GB of memory took up to 30x longer to invoke from a cold start 
    when inside a VPC compared to outside a VPC.
    <br/><br/>
    The added complexity of having a Lambda function live inside a VPC introduces new latencies. 
    These latencies are due to creating an Elastic Network Interface and then waiting for Lambda to assign itself that IP. 
    Also be careful, each Lambda function requires an IP address and you don’t want to run out!
    <hr/>
    <img src="https://cdn-media-1.freecodecamp.org/images/1*FCpFITtI7oxassyWOQdrKw.png" />
    <hr/>
</article>
<h2>Ways to improve AWS Lambda cold start performance</h2>
<article>
    While AWS Lambda cold start times are a real issue, the good news is that there are very useful tools and approaches 
    that can help to mitigate the problem, either by avoiding cold starts altogether or reducing their duration.<br/>
    <h3>Keep lambdas warm</h3>
    Tools invokes the lambdas at a given interval to ensure that the containers aren’t destroyed:
    <ul>
        <li><a href="https://www.npmjs.com/package/lambda-warmer">Lambda Warmer</a></li>
        <li><a href="https://www.npmjs.com/package/serverless-plugin-warmup">Serverless WarmUp Plugin</a></li>
    </ul>
    <h3>Reduce the number of packages</h3>
    We’ve seen that the biggest impact on AWS Lambda cold start times is not the size of the package but the initialization time when the package is actually loaded for the first time.
    Tools which can help you reduce the number of packages
    <ul>
        <li><a href="http://browserify.org">Browserify</a></li>
        <li><a href="https://www.npmjs.com/package/serverless-plugin-optimize">Serverless Optimize Plugin</a></li>
    </ul>
    <h3>Get Lambdas out of VPC</h3>
    You should really only be putting your Lambda functions inside a VPC when you absolutely need access to resources that can’t be exposed to the outside world. 
    Otherwise, you are going to be paying for it in start up times and it matters. 
    As Yan Cui highlighted in his article ‘You’re thinking about cold starts wrong’, cold starts can happen at anytime, and especially during peak service usage.
    <img src="https://cdn-media-1.freecodecamp.org/images/1*4RwbY1CiZC2jzsD7jBtIlQ.png" />
</article>
