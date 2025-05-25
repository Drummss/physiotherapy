# Strolll Take-Home Test

## Technology
The backend is essentially a pure .NET 8 application.

The frontend was based on a Vite React + Typescript template. I use Biome.js for formatting/linting as it is quite speedy (made in Rust 🦀🎉). Similarly, it uses SWC for building rather than Babel (also Rust). MUI used for the component library. 

## Running the Projects

### Method 1
You should be able to run the backend application without any issues within Visual Studio or JetBrains Rider. I developed it in Rider, but run it in Visual Studio appeared to work fine.

You can also just do `dotnet restore` and `dotnet run` from the command line if you wish.

I ran the frontend project using Node version 22. 
- Copy `.env.example` and name it `.env`.
- Install packages (I used yarn).
- Run with `yarn dev` or `npm run dev`.

Frontend will be on `http://localhost:3000`.

### Method 2 (recommended)
Alternatively, if you have Docker installed you can run `docker compose up -d`.
- Frontend will be on `http://localhost:3000/` still.

## Insights
It goes to say that this project is missing a lot of essential parts. First and foremost I would definitely have preferred a lot more tests. At my last workplace we started using the `TestContainers` C# library for writing integration tests as well - which I've become quite a fan of.

Secondly, there is a severe lack of logging/error catching. This would have to be much better to be production ready, and I would also like to have logs being pushed into a Loki instance at the very least. We used Grafana/Loki/Prometheus everywhere at my last workplace.

In this project I wrote a quick (and rather feature incomplete) entity repository pattern and an in-memory entity repository implementation. Works for getting prototype code out and since it is abstracted EntityFramework can be subbed in pretty painlessly.

It should also be noted that accessibility should be integrated fully into the frontend - particularly since the product is used in the medical field. If patients will be reviewing sessions on the site themselves it's imperative that there are no struggles doing so. Ie; screen reader friendly, etc.

In terms of other things I would have liked if it was a fully scoped project:
- Authentication would be needed.
- The idea I had for `SessionRecording` was that a patient could use the headset multiple times throughout the day to work towards their prescribed goal - or in the case of interruptions/disconnects, but I ran out of time to build that properly. I think that a proper ingress service for just absorbing all the headset data would be good for this. It could also be responsible for processing/data cleaning before being reported into the UI.
- There are many improvements that could be made to the frontend in terms of just straight UI/UX. For example, showing patient's prescibed routines on a calendar instead of is just being listed out would be nice. There are also many ways to make the UI/UX for prescibing the routines to patients better.
- The MUI theming system could have been interated more tightly as well as setting up colours/spacing I was using in the pages.
- Lots of general things could be done to clean up the project.
- Not needed for what the project is a face value, but better state management would be good for the project (Redux, useSwr, etc).
- I'm certain there are tons of other things I could have done that I'll think about as time goes on 😅
