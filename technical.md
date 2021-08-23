
# Technical MD

#### 1. What architectures or patterns are you using currently or have worked on recently?  
- The most recent patterns that I have worked with are the Observable Pattern with Angular/Mobx and the Atomic Pattern.
  
#### 2. What do you think of them and would you want to implement it again?  
I really liked working with Observable Pattern, my first experience was with Angular, besides the performance issues I think Angular is a very good framework, opposite from react Angular is very strict and opinionated and in my opinion this a plus. The independence across the observer and observable was something that I really liked, but if not designed correctly you can end up having a lot of subscribers receiving irrelevant data from an observable, another pain point for me was the fact that when you look at a subject code is very hard to know which observers are subscribed to that subject.
  
The Atomic Design didn't work so well, for me it seems more like a guideline than a pattern, the team ended up having a lot of conflicting perspectives about what should be an organism, molecule or a template, maybe we should have planned and set some rules beforehand.  
  
#### 3. What version control system do you use or prefer?  
- TBH I've only used git and I've no complaints about it.  
  
#### 4. What is your favorite language feature and can you give a short snippet on how you use it?  
- I really like how closures work in JS, it is very common to confuse closure with lexical scope, put it simply lexical scope is how nested(childs) functions have access to upper scope values, but in a closure we also have access to closed functions. Is a method with its own scope and context. It is basically a method that creates variables and returns a reference of a second method that uses the previous variables.
 ![Closure code example](https://coding-guide-pattern.netlify.app/images/code_closure_file.png)

#### 5. What future or current technology do you look forward to the most or want to use and why?  
- About future technology it's definitely WebAssembly, if meets the expectations it will open a variety of languages and tools to be used in the web, the possibility to work and learn multiple languages without the downside of losing performance, it will for sure be a big step at the process of learning and improve my skills as a developer.

  
#### 6. How would you find a production bug/performance issue? Have you done this before?  
- Multiple times, my last company had a big focus on SEO/Performance.

  
For a performance problem I would do a profiling, to identify what is bloating the page and follow the stacktrace till the root the problem, the editor and the devtools are IMHO the most importants tools for a webdev (that's why I use vim hahaha), it has so much good features that mastering it has a big impact in the day-to-day productivity.

  
#### 8. How would you improve the application (bug fixes, security, performance, etc.)?  
For simplification purposes I've assumed that we have a service that gets all availables garages with all the needed informations (price, doors, lat, long, images, etc), I then render all markers with all the garages details, this approach should never be used in a real world situation, this a very heavy computing process on the client and back end services.  
  
A good and performative architecture to solve this could be an `getAvailableGarages` request that receives something like:

```
{
    location: {
        lat: number,
        long: number,
    },
    radius: {
        meter: number
    },
    region: {
        regioCode: number
    }
}
```

With this we can query for all the information we need about the garages only for the location that the user is currently searching for, we then could add thresholds to refetch with the new location radius as the user navigates, and also an button where the user would do an refetch for the current location. This approach would also help with the concurrency problem that we would have in the real world.  
  
I was planning to do an animation using transitions at the entering and exit of the card but unfortunately I had some personal matters to attend to and wasn't able to start this.  
  
Another improvement I intend to make is adding routes to the grage pages, I took the opportunity of this challenge to experiment with redux persist and redux toolkit.  
  
I've also decided to use MapBox instead of GoogleMaps to try out something differently, sadly I had some problems with the TS support in the React package of MapBox that was I using, my take from the experience was that the MapBox itself has a very good API, provides a lot of customizations and looks really nice, but the React package sadly doesn't have all the featured that the SDK does, and some of the dependencies lacks TS support, next time I'll try to use directly from the SDK.  
  
Reading your guys API docs and developing this little challenge it made very clear that the real world application of this kind of product is very hard, with very challenging and exciting problems.  
  
I've used a boilerplate that I setup a while ago for freelancing and side projects, but I didn't update the dependencies, so it has a lot of security vulnerabilities because of the outdated packages.  
  
If I had more time I would definitely write, improve the tests, separate and then describe them better.
