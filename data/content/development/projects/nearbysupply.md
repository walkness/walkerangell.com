#### Background

Nearby Supply helps people find products by connecting them with local stores. At its simplest, a shopper submits a request for any product, Nearby Supply sends it to local stores that are likely to stock that product, and each store responds in real-time.


#### Development Work

I developed a complete backend and frontend to enable realtime communication between shoppers and shops.

Anticipating an eventual need for robust machine learning and natural language processing capabilities, Python seemed like a natural choice, so I chose Django to power the backend. The incredible [Django REST framework](http://www.django-rest-framework.org/) made it easy to impelement a JSON API to be consumed by the JavaScript or iOS frontend.

The realtime component is implemented using a user's choice of Email, SMS (provided by [Twilio](https://www.twilio.com/)), and iOS push notifications while the user _is not_ using the app, or using Websockets (provided by [PubNub](https://www.pubnub.com/)) while the user _is_ using the app. To keep the responses snappy, I pulled all of the notification processing out of the request/response cycle using [Celery](http://www.celeryproject.org/) and [RabbitMQ](https://www.rabbitmq.com/), which also provides a solid foundation for asynchronous processing of shopper queries.

For the frontend, I developed an app for the web using React and native apps for iOS, written in Swift 2. For iOS, I split the product into separate apps for shoppers and shops that share a considerable portion of their codebase, but make the user's experience more straightforward, and provide more options for distribution.

To speed up initial page loads, I use React "isomorphically" – using Django to pre-render my React application on the server, and return a fully rendered page to the user, from which the React app can start on the client.
