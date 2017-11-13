### Portfolio

*Based on this [example](https://github.com/sleexyz/flow-react-redux-example)*
- react
- redux
- flow
- styled-components
- jest
- prettier
- ES7 async / await

Why am I not testing this app? because it really doesn't merit it.
Jest and Enzyme are great, but I am not gonna do TDD all the time.
I am making this silly portfolio site for myself. 
Namely to learn some new front end stuff and have some fun while doing it.
I TDD a lot at work and part of what I get paid for includes writing a lot of tests. 
Give me break. More importantly, give yourself a break. <3

The one thing, i do like, even though I am not writing any tests, is writing statically typed javascript using Flow.
As I add more things and connect them together, Flow helps me keep things in check and less brittle.

This site uses Tone.js for synthesizing audio. When rolling over the list of projects on the page, 
2 things happen on raf
1- the project thumb gets pixelated
2- audio polysynth is triggered

The amount of pixelation and the audio note are linearly mapped from the same sequence of random numbers.
The sequence of random number is generated using a Box–Muller transform which is implemented by the crypto.getRandomValues

 
