import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentsTemp {
  commentsPlaceholder: string[] = [
    "Hey everyone!",
    "Wow, this is awesome!",
    "I can't believe this is happening!",
    "Hello from New York!",
    "Can you shout out my friend Alex?",
    "When does the next segment start?",
    "Great job, keep it up!",
    "I'm loving this so much!",
    "Who else is watching from Europe?",
    "What's the name of that song?",
    "This is the best stream ever!",
    "Anyone else here for the first time?",
    "Can you answer my question please?",
    "I've been waiting for this all day!",
    "The quality of this stream is amazing!",
    "Thank you for doing this!",
    "How do I get more information on this?",
    "This is exactly what I needed today!",
    "Please do more streams like this!",
    "I'm learning so much right now!",
    "Can you slow down a bit?",
    "This is going straight to my favorites!",
    "Is there a replay available?",
    "I've never seen anything like this before!",
    "How can I support the channel?",
    "You guys are the best!",
    "What's next on the agenda?",
    "Can someone summarize what's happened so far?",
    "This is blowing my mind!",
    "Where can I find more content like this?",
    "Keep it going, you're doing great!",
    "I'm telling all my friends about this!",
    "This chat is going crazy!",
    "Can you provide a link to that?",
    "Thank you for the amazing content!",
    "What's your schedule for the next streams?",
    "I can't wait for the next part!",
    "This is such high-quality content!",
    "Please save this stream!",
    "How long is this stream going to be?",
    "This community is awesome!",
    "Can someone help me with a question?",
    "This is so much fun!",
    "I'm so glad I found this stream!",
    "How many viewers are here right now?",
    "You just made my day!",
    "Can we get a behind-the-scenes look?",
    "What's everyone's favorite part so far?",
    "This is such a great experience!"
  ];

  submitData(youtubeID: string, twitchID: string, googleAPIKey: string) {
    console.log(`youtubeID: ${youtubeID}, twitchID: ${twitchID}, googleAPIKey ${googleAPIKey}` )
  }

  constructor() { }
}
