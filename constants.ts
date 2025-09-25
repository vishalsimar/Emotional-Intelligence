import { Emotion, EmotionCategory } from './types';

const ALL_EMOTIONS: Emotion[] = [
  {
    id: 'emotion-1',
    name: 'Anger',
    emoji: '🔴',
    color: 'red',
    description: 'A strong feeling of annoyance, displeasure, or hostility.',
    relatedWords: ['Irritation', 'Frustration', 'Rage'],
    strategies: {
      immediate: [
        { id: 's1-1', title: 'Deep Breathing', steps: ['Inhale slowly through your nose for 4 seconds.', 'Hold your breath for 4 seconds.', 'Exhale slowly through your mouth for 6 seconds.', 'Repeat this 5 times to calm your nervous system.'] },
        { id: 's1-2', title: 'Change Your Scenery', steps: ['If possible, step outside for fresh air.', 'If not, move to a different room.', 'This creates mental distance from the trigger.'] },
        { id: 's1-3', title: 'Count to Ten', steps: ['Pause before you react.', 'Slowly count to 10 in your head.', 'This gives your rational brain time to catch up.'] },
      ],
      shortTerm: [
        { id: 's1-4', title: 'Vigorous Exercise', steps: ['Engage in at least 15 minutes of physical activity.', 'Try a brisk walk, a run, or dancing.', 'Exercise is a powerful physical outlet for angry energy.'] },
        { id: 's1-5', title: 'Journaling', steps: ['Write down exactly what you\'re feeling and why.', 'Don\'t censor yourself; let the thoughts flow out.', 'This helps you process the emotion without acting on it.'] },
        { id: 's1-6', title: 'Problem-Solve', steps: ['Once you feel calmer, identify the specific problem.', 'Brainstorm 2-3 potential solutions you can try.', 'Focus on what you can control.'] },
      ],
      longTerm: [
        { id: 's1-7', title: 'Identify Triggers', steps: ['Notice what consistently makes you angry.', 'Keep a log of situations, people, or thoughts.', 'Recognizing your triggers is the first step to managing them.'] },
        { id: 's1-8', title: 'Develop Empathy', steps: ['Try to see the situation from the other person\'s point of view.', 'Ask yourself: "What might they be thinking or feeling?"', 'This can soften feelings of resentment.'] },
        { id: 's1-9', title: 'Mindfulness Meditation', steps: ['Practice 5-10 minutes of mindfulness each day.', 'Focus on your breath and observe your thoughts without judgment.', 'This reduces reactivity over time.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho1-1', title: 'Stay Calm and Validate', steps: ['Do not mirror their anger. Use a calm tone.', 'Say "I can see why you\'re so angry." This shows you\'re listening, not judging.', 'Avoid smiling or laughing, which can feel dismissive.'] },
      { id: 'ho1-2', title: 'Give Them Space', steps: ['Ask if they need some time alone before talking.', 'Don\'t crowd them or physically block them.', 'Let them know you\'re there for them when they\'re ready to talk.'] },
      { id: 'ho1-3', title: 'Listen Without Defensiveness', steps: ['Avoid saying "You shouldn\'t be angry" or making excuses.', 'Listen to their perspective first, even if you disagree.', 'Focus on understanding their feelings before responding.'] },
    ],
  },
  {
    id: 'emotion-2',
    name: 'Sadness',
    emoji: '🔵',
    color: 'blue',
    description: 'A feeling of unhappiness, sorrow, or grief.',
    relatedWords: ['Grief', 'Despair', 'Loneliness'],
    strategies: {
      immediate: [
        { id: 's2-1', title: 'Acknowledge the Feeling', steps: ['Allow yourself to feel sad without judgment.', 'Say to yourself: "It\'s okay that I feel sad right now."', 'Suppressing it can make it worse.'] },
        { id: 's2-2', title: 'Self-Soothing', steps: ['Wrap yourself in a warm blanket.', 'Listen to calming music or a comforting podcast.', 'Have a warm, non-caffeinated drink like herbal tea.'] },
        { id: 's2-3', title: 'Mindful Observation', steps: ['Notice where you feel sadness in your body.', 'Is it a tightness in your chest? A heaviness in your limbs?', 'Just observe without trying to change it.'] },
      ],
      shortTerm: [
        { id: 's2-4', title: 'Connect with Nature', steps: ['Spend at least 10 minutes outdoors.', 'If you can, go for a walk in a park or near trees.', 'Nature has a proven restorative effect on mood.'] },
        { id: 's2-5', title: 'Engage in a Gentle Hobby', steps: ['Do something you usually enjoy, even if you don’t feel like it.', 'Examples: reading, drawing, listening to music.', 'The activity itself can be gently uplifting.'] },
        { id: 's2-6', title: 'Reach Out for Support', steps: ['Call or text a trusted friend or family member.', 'You don\'t have to talk about the sadness; just connecting can help.', 'Social connection is a powerful buffer.'] },
      ],
      longTerm: [
        { id: 's2-7', title: 'Practice Gratitude', steps: ['Each day, write down or think of three specific things you are grateful for.', 'It could be as simple as a sunny day or a good cup of coffee.', 'This shifts focus from loss to appreciation.'] },
        { id: 's2-8', title: 'Build a Support System', steps: ['Actively cultivate relationships that make you feel valued.', 'Schedule regular check-ins with friends or family.', 'Strong social ties are key to long-term well-being.'] },
        { id: 's2-9', title: 'Seek Professional Help', steps: ['If sadness persists and impacts your daily life, consider therapy.', 'A therapist can provide tools and strategies to manage it effectively.', 'It is a sign of strength to ask for help.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho2-1', title: 'Just Be Present', steps: ['You don\'t need to have the right words. Simply sitting with them in silence can be powerful.', 'Your non-judgmental presence shows you care.', 'Let them lead the conversation, if there is one.'] },
      { id: 'ho2-2', title: 'Listen Without \'Fixing\'', steps: ['Let them talk without interrupting.', 'Avoid giving unsolicited advice or saying "Look on the bright side."', 'The goal is to understand and validate, not to solve their problem.'] },
      { id: 'ho2-3', title: 'Offer Specific, Practical Help', steps: ['Instead of "Let me know if you need anything," try "Can I bring you dinner tonight?" or "I can walk your dog this afternoon."', 'This is easier for them to accept.' ] },
    ],
  },
  {
    id: 'emotion-3',
    name: 'Fear',
    emoji: '🟣',
    color: 'purple',
    description: 'An unpleasant emotion caused by the belief that someone or something is dangerous.',
    relatedWords: ['Anxiety', 'Worry', 'Nervousness'],
    strategies: {
      immediate: [
        { id: 's3-1', title: '5-4-3-2-1 Grounding', steps: ['Name 5 things you can see.', 'Name 4 things you can physically feel.', 'Name 3 things you can hear.', 'Name 2 things you can smell.', 'Name 1 thing you can taste.'] },
        { id: 's3-2', title: 'Box Breathing', steps: ['Breathe in for 4 seconds.', 'Hold your breath for 4 seconds.', 'Breathe out for 4 seconds.', 'Hold your breath for 4 seconds. Repeat.'] },
        { id: 's3-3', title: 'Cold Water', steps: ['Splash cold water on your face.', 'Or, hold an ice cube in your hand.', 'The shock of the cold can interrupt a fear cycle.'] },
      ],
      shortTerm: [
        { id: 's3-4', title: 'Challenge Anxious Thoughts', steps: ['Write down the worry that is scaring you.', 'Ask: "What is the evidence for this thought? Against it?"', 'Try to come up with a more balanced, realistic thought.'] },
        { id: 's3-5', title: 'Progressive Muscle Relaxation', steps: ['Starting with your toes, tense a muscle group for 5 seconds.', 'Release the tension completely for 10 seconds.', 'Work your way up your body.'] },
        { id: 's3-6', title: 'Limit Caffeine & News', steps: ['Avoid stimulants like coffee that can mimic anxiety symptoms.', 'Limit your exposure to distressing news for a day or two.', 'Protect your mental space.'] },
      ],
      longTerm: [
        { id: 's3-7', title: 'Gradual Exposure', steps: ['Identify a fear you want to overcome.', 'Break it down into very small, manageable steps.', 'Practice the first step until it feels less scary, then move to the next.'] },
        { id: 's3-8', title: 'Establish a Routine', steps: ['Create predictable routines for mornings and evenings.', 'Consistent sleep, meals, and work times provide stability.', 'This reduces the sense of uncertainty that fuels anxiety.'] },
        { id: 's3-9', title: 'Regular Exercise', steps: ['Aim for 30 minutes of moderate exercise most days of the week.', 'Physical activity is one of the most effective long-term strategies for anxiety.', 'It burns off stress hormones and releases endorphins.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho3-1', title: 'Don\'t Dismiss Their Fear', steps: ['Avoid saying "Don\'t worry" or "It\'s not a big deal." Their fear is real to them.', 'Instead, say "That sounds really scary" or "I\'m here with you."', 'Validation is key to making them feel safe.'] },
      { id: 'ho3-2', title: 'Help Them Ground Themselves', steps: ['Gently guide them to focus on the present.', 'You can use the 5-4-3-2-1 technique with them, or ask them to describe their immediate surroundings.', 'Slow, deep breathing with them can also help.'] },
      { id: 'ho3-3', title: 'Offer Reassurance of Safety', steps: ['Remind them that they are physically safe right now (if true).', 'Let them know you\'re with them and you\'re not going anywhere.', 'A calm and steady presence is very powerful.'] },
    ],
  },
  {
    id: 'emotion-4',
    name: 'Happiness',
    emoji: '🟡',
    color: 'yellow',
    description: 'A feeling of pleasure, contentment, or joy.',
    relatedWords: ['Joy', 'Contentment', 'Elation'],
    strategies: {
      immediate: [
        { id: 's4-1', title: 'Savor the Moment', steps: ['Pause what you are doing for 30 seconds.', 'Pay attention to the positive feelings in your body.', 'Notice the specific sights, sounds, and sensations around you.'] },
        { id: 's4-2', title: 'Express It', steps: ['Smile genuinely, even if you are alone.', 'If you can, laugh out loud.', 'Tell someone what you\'re happy about.'] },
        { id: 's4-3', title: 'Positive Body Language', steps: ['Stand up straight and tall.', 'Open your posture (uncross arms).', 'Your physical state can reinforce your emotional state.'] },
      ],
      shortTerm: [
        { id: 's4-4', title: 'Share Your Joy', steps: ['Tell a supportive friend or family member about your good news.', 'Celebrating with others can amplify positive emotions.', 'Choose someone who you know will be happy for you.'] },
        { id: 's4-5', title: 'Journal About It', steps: ['Write down the details of what brought you happiness.', 'Describe what happened, who was there, and how it felt.', 'This helps you relive and solidify the experience.'] },
        { id: 's4-6', title: 'Create a "Joy List"', steps: ['Make a list of 10-15 simple things that reliably bring you happiness.', 'Examples: a specific song, a type of tea, a funny video.', 'Keep this list handy for when you need a boost.'] },
      ],
      longTerm: [
        { id: 's4-7', title: 'Practice Gratitude', steps: ['Keep a journal where you regularly write down things you are thankful for.', 'Make it a habit, like at the end of each day.', 'This trains your brain to notice the positive.'] },
        { id: 's4-8', title: 'Cultivate Optimism', steps: ['When you face a setback, practice looking for the lesson or opportunity.', 'Believe in a positive future and your ability to handle challenges.', 'This is a skill that can be developed over time.'] },
        { id: 's4-9', title: 'Perform Acts of Kindness', steps: ['Do something kind for someone else without expecting anything in return.', 'It can be small, like giving a genuine compliment.', 'Helping others is a reliable way to boost your own happiness.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho4-1', title: 'Be Genuinely Happy For Them', steps: ['Share in their excitement. Ask questions to hear more about their good news.', 'Your genuine enthusiasm will amplify their joy.', 'Mirror their positive energy.'] },
      { id: 'ho4-2', title: 'Celebrate With Them', steps: ['Don\'t downplay their achievement or change the subject.', 'Offer a sincere "Congratulations!" or "That\'s amazing news, tell me more!"', 'Let them have the spotlight.'] },
      { id: 'ho4-3', title: 'Avoid One-Upping', steps: ['Resist the urge to immediately share a similar, bigger story of your own.', 'Let this be their moment.', 'The focus should be entirely on their positive experience.'] },
    ],
  },
  {
    id: 'emotion-5',
    name: 'Disgust',
    emoji: '🟢',
    color: 'green',
    description: 'A feeling of revulsion or strong disapproval.',
    relatedWords: ['Aversion', 'Revulsion', 'Contempt'],
    strategies: {
      immediate: [
        { id: 's5-1', title: 'Create Physical Distance', steps: ['If possible, physically move away from the source of your disgust.', 'This is your body\'s natural protective instinct.', 'Step into another room or go outside.'] },
        { id: 's5-2', title: 'Sensory Shift', steps: ['Engage a different, pleasant sense.', 'Look at a beautiful picture on your phone.', 'Smell something you enjoy, like coffee, a flower, or essential oil.'] },
        { id: 's5-3', title: 'Neutral Observation', steps: ['Acknowledge the feeling without judgment.', 'Say to yourself: "I am feeling disgust, and that\'s okay."', 'This separates you from the intensity of the emotion.'] },
      ],
      shortTerm: [
        { id: 's5-4', title: 'Cognitive Reappraisal', steps: ['Ask yourself: "Is there another way to look at this situation?"', 'Try to find a more neutral or objective perspective.', 'This can reduce the emotional charge.'] },
        { id: 's5-5', title: 'Practice Compassion', steps: ['If disgust is aimed at a person (contempt), try to understand their story.', 'Consider the factors that might have led to their behavior.', 'This can foster empathy and reduce judgment.'] },
        { id: 's5-6', title: 'Focus on Your Breath', steps: ['Breathe in through your nose and out through your mouth.', 'Focusing on the physical sensation of breathing can ground you.', 'It helps you tolerate the uncomfortable physical sensations of disgust.'] },
      ],
      longTerm: [
        { id: 's5-7', title: 'Understand Its Purpose', steps: ['Recognize that disgust is a protective emotion.', 'Its purpose is to keep you safe from contamination or social violations.', 'Appreciating its function can reduce its power.'] },
        { id: 's5-8', title: 'Expand Your Perspective', steps: ['Gently expose yourself to different cultures, ideas, and ways of life.', 'Read books or watch documentaries about unfamiliar topics.', 'This broadens your acceptance and reduces reactive disgust.'] },
        { id: 's5-9', title: 'Mindful Self-Compassion', steps: ['Practice being kind to yourself when you feel disgust.', 'This is especially important if the feeling turns inward as self-criticism.', 'Treat yourself as you would a good friend.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho5-1', title: 'Acknowledge Their Reaction', steps: ['Validate their feeling by saying something like, "I can understand why that would be upsetting to you."', 'Don\'t tell them they are overreacting.', 'Respect their experience.'] },
      { id: 'ho5-2', title: 'Don\'t Force Engagement', steps: ['If they are disgusted by something, don\'t try to convince them it\'s not so bad.', 'Respect their boundary and help them create distance if needed.', 'Allow them to disengage from the trigger.'] },
      { id: 'ho5-3', title: 'Gently Shift Focus', steps: ['After acknowledging their feeling, you can try to change the topic or move to a different environment.', 'This can help them move past the immediate feeling.', 'Offer a distraction.'] },
    ],
  },
  {
    id: 'emotion-6',
    name: 'Surprise',
    emoji: '🟠',
    color: 'orange',
    description: 'A brief feeling of astonishment or amazement.',
    relatedWords: ['Shock', 'Astonishment', 'Awe'],
    strategies: {
      immediate: [
        { id: 's6-1', title: 'Pause and Breathe', steps: ['Take one deep, conscious breath.', 'Surprise is the shortest-lived emotion; this gives you a second to process.', 'Resist the urge to react instantly.'] },
        { id: 's6-2', title: 'Scan Your Body', steps: ['Quickly notice the physical sensations of surprise.', 'Are your eyes wide? Is your mouth open? Is your heart rate up?', 'This brings you into the present moment.'] },
        { id: 's6-3', title: 'Label the After-Emotion', steps: ['After the initial shock, what do you feel?', 'Is it happiness, fear, confusion, or something else?', 'Naming the next emotion helps you manage it.'] },
      ],
      shortTerm: [
        { id: 's6-4', title: 'Gather Information', steps: ['If the surprise was due to unexpected news, ask clarifying questions.', 'Avoid making assumptions.', 'Get a clearer picture of the situation before you decide how to feel or act.'] },
        { id: 's6-5', title: 'Talk It Out', steps: ['Describe the surprising event to a trusted person.', 'Explaining what happened can help your brain make sense of it.', 'Verbalizing can organize your thoughts.'] },
        { id: 's6-6', title: 'Check Your Assumptions', steps: ['Ask yourself: "What did I believe would happen?"', 'Understanding your prior expectation can reveal why this event was so surprising.', 'This can be a valuable learning moment.'] },
      ],
      longTerm: [
        { id: 's6-7', title: 'Cultivate Curiosity', steps: ['Adopt a mindset of curiosity and openness to the unknown.', 'View surprising events not as threats, but as potential adventures.', 'This makes the unexpected less jarring.'] },
        { id: 's6-8', title: 'Practice Mindfulness', steps: ['Engage in daily mindfulness practice.', 'This helps you stay grounded in the present moment.', 'Being present reduces the shock of the unexpected.'] },
        { id: 's6-9', title: 'Embrace a Growth Mindset', steps: ['View surprises as opportunities to learn and grow.', 'Ask yourself: "What can I learn from this?"', 'This reframes surprises from disruptive to constructive.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho6-1', title: 'Stay Calm and Grounding', steps: ['Your calm presence can be very reassuring.', 'Help them take a deep breath with you.', 'This co-regulation can be very effective.'] },
      { id: 'ho6-2', title: 'Validate and Give Space', steps: ['Acknowledge the shock by saying "Wow, that\'s a lot to take in."', 'Ask if they need a minute to process before talking.', 'Don\'t rush them.'] },
      { id: 'ho6-3', title: 'Help Process Information', steps: ['Once the initial shock passes, help them make sense of it.', 'Ask open-ended questions like "How are you feeling about this?"', 'Listen without judgment.'] },
    ],
  },
  {
    id: 'emotion-7',
    name: 'Anticipation',
    emoji: '⚪️',
    color: 'teal',
    description: 'A feeling of expectation about a future event, which can be experienced as excitement or anxiety.',
    relatedWords: ['Expectation', 'Excitement', 'Dread', 'Suspense'],
    strategies: {
      immediate: [
        { id: 's7-1', title: 'Mindful Breathing', steps: ['Focus on the physical sensation of your breath.', 'Breathe in for 4, hold for 4, out for 6.', 'This anchors you in the present, away from future worries.'] },
        { id: 's7-2', title: 'Challenge Catastrophic Thinking', steps: ['Ask yourself: "What is the worst that could happen?"', '"What is the best?"', '"What is most likely to happen?"', 'This CBT technique provides perspective.'] },
        { id: 's7-3', title: 'Engage Your Senses', steps: ['Use the 5-4-3-2-1 grounding technique.', 'Notice 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.', 'This pulls your focus from anxious thoughts to your immediate environment.'] },
      ],
      shortTerm: [
        { id: 's7-4', title: 'Channel Energy into Planning', steps: ['If feeling excited, create a plan or checklist.', 'If feeling anxious, identify one small, controllable preparatory step.', 'Action provides a sense of agency and reduces helplessness.'] },
        { id: 's7-5', title: 'Schedule "Worry Time"', steps: ['Set aside a specific 15-minute window to consciously think about your worries.', 'Outside of this time, gently redirect your thoughts.', 'This contains anxiety so it doesn\'t dominate your day.'] },
        { id: 's7-6', title: 'Gather Necessary Information', steps: ['Uncertainty fuels anxious anticipation.', 'Identify what you don\'t know and find factual answers.', 'Reducing ambiguity can significantly lower anxiety.'] },
      ],
      longTerm: [
        { id: 's7-7', title: 'Cultivate a Growth Mindset', steps: ['View potential challenges not as threats, but as opportunities to learn and grow.', 'This reframes dread into a manageable challenge.', 'Focus on effort and learning rather than a fixed outcome.'] },
        { id: 's7-8', title: 'Practice Mindfulness Meditation', steps: ['Regular practice strengthens your ability to observe thoughts without getting entangled in them.', 'This helps you see anticipatory thoughts as just thoughts, not reality.'] },
        { id: 's7-9', title: 'Focus on Process, Not Outcome', steps: ['Set goals related to the steps you can control.', 'For a presentation, focus on preparing well, not on receiving applause.', 'This reduces pressure and outcome-dependent anxiety.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho7-1', title: 'Validate, Don\'t Dismiss', steps: ['Acknowledge their feeling: "It makes sense that you\'re feeling nervous about the interview."', 'Avoid saying "Don\'t worry" or "It will be fine."', 'Validation builds connection and safety.'] },
      { id: 'ho7-2', title: 'Help Them Externalize and Plan', steps: ['Ask, "What are all the things on your mind about this?"', 'Help them identify one small, actionable step they can take.', 'This shifts them from worrying to problem-solving.'] },
      { id: 'ho7-3', title: 'Offer a Healthy Distraction', steps: ['Suggest an engaging activity that is unrelated to the source of anticipation.', 'Going for a walk, watching a movie, or playing a game can provide a mental break.'] },
    ],
  },
  {
    id: 'emotion-8',
    name: 'Trust',
    emoji: '🟤',
    color: 'sky',
    description: 'A firm belief in the reliability, truth, ability, or strength of someone or something; feeling secure.',
    relatedWords: ['Confidence', 'Faith', 'Security', 'Reliance'],
    strategies: {
      immediate: [
        { id: 's8-1', title: 'Acknowledge Trustworthy Acts', steps: ['When someone meets an expectation, notice it.', 'Verbally appreciate it: "Thank you for being so reliable."', 'This positive reinforcement strengthens the relationship.'] },
        { id: 's8-2', title: 'Be Fully Present', steps: ['When interacting with someone you trust, put away distractions.', 'Active listening and engaged presence deepens the connection and reinforces feelings of security.'] },
        { id: 's8-3', title: 'Notice Physical Sensations', steps: ['Check in with your body when you feel trust.', 'Notice the feeling of calm, relaxation, or openness.', 'Connecting the emotion to a physical state strengthens it.'] },
      ],
      shortTerm: [
        { id: 's8-4', title: 'Practice Graduated Vulnerability', steps: ['Share something small and personal with someone you want to build trust with.', 'Their positive response creates a foundation for deeper connection.', 'This is a core concept from Brené Brown\'s research.'] },
        { id: 's8-5', title: 'Be Consistently Reliable', steps: ['To build trust from others, keep your commitments.', 'Follow through on what you say you will do, no matter how small.', 'This also builds self-trust.'] },
        { id: 's8-6', title: 'Communicate Needs and Boundaries', steps: ['Clearly and respectfully state your needs and limits.', 'Trust thrives on clarity and mutual respect.', 'This prevents misunderstandings that can erode trust.'] },
      ],
      longTerm: [
        { id: 's8-7', title: 'Build Self-Trust', steps: ['Make and keep small promises to yourself.', 'Listen to your intuition and act on it.', 'When you trust yourself, you are better able to assess the trustworthiness of others.'] },
        { id: 's8-8', title: 'Learn Healthy Repair', steps: ['Understand that trust can be bent and repaired.', 'Learn the components of a sincere apology and how to forgive.', 'This makes relationships resilient. (See Gottman Institute research).'] },
        { id: 's8-9', title: 'Assume Good Intent (with Discernment)', steps: ['Default to believing that people are doing their best.', 'This reduces cynicism and fosters an open-hearted approach to relationships.', 'Remain aware and protect yourself, but lead with generosity.'] },
      ],
    },
    helpingOthers: [
      { id: 'ho8-1', title: 'Be Consistent and Dependable', steps: ['Your actions are the most powerful trust-building tool.', 'Show up when you say you will. Follow through on your promises.', 'Reliability is the bedrock of trust.'] },
      { id: 'ho8-2', title: 'Respect Their Pace and Boundaries', steps: ['If someone has been hurt, they may be slow to trust.', 'Do not push for more vulnerability than they are ready to offer.', 'Let them control the pace of the relationship.'] },
      { id: 'ho8-3', title: 'Listen Without Judgment', steps: ['Create a safe emotional space for them to share their fears or past experiences.', 'Listen to understand, not to fix or rebut.', 'Your non-judgmental acceptance can be incredibly healing.'] },
    ],
  },
];

export const EMOTION_CATEGORIES: EmotionCategory[] = [
    {
        id: 'cat-basic',
        name: 'Basic Emotions',
        isCollapsible: false,
        emotions: ALL_EMOTIONS,
    },
];
