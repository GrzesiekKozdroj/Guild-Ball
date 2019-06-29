var squaddies;
const alchemists = [
    "#598E38",
    "Alchemists",
    "./icons/Alchemists/Alchemists.png",
    [squaddies],
    "#000",
    `They are a new Guild. Not so unlike the others in their activities, but very much so in their ideology. Being able to have observed hundreds of years of development before beginning your own venture has a tendency to allow you to avoid certain growing pains. However, the correlation is that unlike any of its rivals, the Alchemist’s Guild has yet to prove to the people that their industry is worthwhile.
    <br> <br>
    I possess a tome stolen from one of their libraries, it is interesting reading. The volume chronicles each of their Guild member’s notable experiments, realistically a way to address all of the explosions that have levelled buildings, led to the mysterious disappearance of townsfolk, and cast eerie green fires that have burned their way through entire villages.
    <br><br>
     The real victory in Guild Ball for the Alchemist’s Guild is a public relations one, which they can desperately use. Even if they are beaten, the crowds will likely leave with the bright lights and colours of their tricks seared into their minds, lending them legitimacy and authority. There is more at stake here for them than just the game.`,
    "—Obulus, Mortician’s Guild Team Captain"
];
const blacksmiths = [
    "#8F9FA8",
    "Blacksmiths",
    "./icons/Blacksmiths/Blacksmiths.png",
    [squaddies],
    "#000",
    `Time was the Blacksmith’s Guild made a fortune in outfitting the armies of the Century Wars. But then, that was years past, and they were hit hard in the aftermath. A lot came out of the unification of the Empire of the Free Cities, but one of the sanctions which doesn’t get talked about? A law limiting the sale of weaponry by the Blacksmith’s Guild to an exclusive contract. And who can they sell weapons to under this law? That’s it, you guessed it. The other Guilds, and not a soul else.Sounds unfair, doesn’t it? It should! Came directly from the other Guilds, when they saw how rich the Smithy’s were getting. 
    <br><br>
    You’ve probably never seen their like. No captain, oh no... instead, they invite Masters from all over to come and play for the Guild. The actual captain for each game is chosen behind the scenes. Makes for a varied playstyle, that’s for sure. Clever way of keeping your opponents guessing, I reckon. But I don’t know that it’s not their worst enemy too. Must be hard to figure out a game plan when you have no idea who your captain will be...`,
    "—Tapper, Brewer’s Guild Team Captain"
];
const brewers = [
    "#D1B332",
    "Brewers",
    "./icons/Brewers/Brewers.png",
    [squaddies],
    "#000",
    `Real rough and tumble boys, these lads. You’re never going to meet yourself anyone more likely to knock you down into the dirt, mark my words. Tough, thick skulled bastards that love to brawl. But you know? For all of that, they’re all right by me. They’re just playing the game and they don’t take liberties with it none. I’ll go ten matches with the Drunks over one with the Meatheads or the Spooks, bruises and all. Play against ‘em one day, and you’ll see what I mean. They’re all aggressive and up in your face on the pitch, and after will sit down to drink with you like you’re old comrades.
    <br><br>
    The current Drunks are nearly all from over Raedland way, around Maldriven and beyond. Considering how hard some of their predecessors have been, they’re a fun bunch. Decent in their own way. You wouldn’t remember, but before them was the lot from Erskirad. Far too serious for their own good, like their ale had grown stale long since. No one was sad to see the back of them. Let’s just hope that the Maldriven Whisky houses keep their hold over the Brewer’s Guild for a long time to come, eh?`,
    "—Flint, Mason’s Guild Team Vice Captain"
];
const butchers = [
    "#CA1518",
    "Butchers",
    "./icons/Butchers/Butchers.png",
    [squaddies],
    "#000",
    `Who are they? They’re a real heavy set. Killers, every one of them. Yeah, those lads only play Guild Ball one way. Pounding down the pitch in a headlong charge and leaving a mess behind ‘em that makes most shipwrecks look more salvageable. Thing that scares everyone though, is that they’ve got themselves a heavy rep over the years for forgetting the rules on occasion. 
    <br><br>
    Against any team you can get wasted, but these boys are much heavier handed. The Butcher’s Guild has had to bail its team out more than once for the odd ‘accident’ where someone goes home a memory, if you follow my meaning. Don’t mess with those lads, young blood. You can run around them all you want, staying just out of reach of a brute like the Ox, but you’d best pray that they don’t catch you. 
    <br><br>
    I’m too old and wise to have made friends in this game, but if I had, I’d have seen plenty of them go home in boxes after games against those maniacs. You’re just meat to them. Weak, tender, soft meat. And they’re the Butchers.`,
    "—Greyscales, Fisherman’s Guild Vice Captain"
];
const cooks = [
    "#E31D1A",
    "Cooks",
    "./icons/Cooks/Cooks.png",
    [squaddies],
    "#000",
    `Ah, so you want to know more about our allies? I’m surprised you don’t already. Granted, they move in high circles, preparing banquets for those with fuller purses than you or I, but we’ve had close ties to the Cook’s Guild for longer than anyone can rightly remember. Theirs isn’t a new Guild, lad, not by any stretch of the imagination.I’ve known Wellington for years, ever since the war. He’s an unforgiving bastard with a spiteful tongue, I won’t argue that – but if you knew him as I do, you’d see that’s just his way of things. He’s a good man, devoted to his people. A crew like his is as much a tight knit family as we had once, before... well, like we used to have.
    <br><br>
     Why their sudden interest in the game? Well, it’s true the Cook’s Guild doesn’t usually much care to field a team, but the Master Chef has taken to the pitch at my behest. Call it a favour between old soldiers. I see the next question coming – better you don’t ask it, lad. My patience is wearing thin. Time for you to piss off now, and keep your teeth all straight inside that loose trap of yours.`,
    "—Ox, Butcher’s Guild"
];
const engineers = [
    "#7F1715",
    "Engineers",
    "./icons/Engineers/Engineers.png",
    [squaddies],
    "#000",
    `Although nowhere near as new as some of the fledgling Guilds that have come into being since the end of the Century Wars, the Engineer’s Guild is certainly not much older, barely more longstanding than our own enterprise. They were originally formed just prior to the conflict, as siege engines and fortifications began to be constructed. All rather pedestrian to an Alchemist of course. Their science is a trite and laborious one. Advancement is far too slow, and their attitudes often boorish and condescending, especially amongst the older Magisters and Artificers. 
    <br><br>
    I discern an intriguing division that is very apparent to me in their houses; the tired old science sitting uncomfortably alongside their new discoveries. They have the most devastating potential of all at their fingertips, but their own innate animosity and stubborn pride stops them from achieving greatness. 
    <br><br>
    But to be fair and pay them their due, not all are that way. The keenest amongst them have lent their hands to the construction of clockwork instruments and devices of far more interest to our enlightened minds. In these, I see the path to immortality.`,
    "—Midas, Alchemist’s Guild Team Captain"
];
const falconers = [
    "#41693D",
    "Falconers",
    "./icons/Falconers/Falconers.png",
    [squaddies],
    "#000",
    `Damn mysterious lot, the Falconers. You ask a common man in the marketplace about them, I’ll wager you see a blank face and little else. I only know what little I do by keeping my ear to the streets, like. Word is they were formed from a bunch of mercenaries, old scouts from the armies marching in the Century Wars. One thing’s for sure though – they’ve made real money hiring themselves out to the nobility. 
    <br><br>
    Their great birds are a popular accompaniment in bloodsport hunting, and fi ercelyfashionable amongst the aristocracy. That was their first foot on the ladder, and they soon banded together to form a team. Don’t blame ‘em. Fair to say that life on the pitch has to be a lot better than living at the whim of some inbred lordling. 
    <br><br>
    No one really knows what the connection is between the Falconers and Hunters, but rumour down the pub is that Devana and Theron have been seen huddled together, talking until the early hours, like. If you asked me to put money on it, I’d wager they have a past at the very least. ‘Course, I’ve never been one to gossip, have I? `,
    "—Lucky,  Free  Agent   "
];
const farmers = [
    "#EA902D",
    "Farmers",
    "./icons/Farmers/Farmers.png",
    [squaddies],
    "#000",
    `You ever hear of the Farmer’s Guild, lad? How about their Guild Ball team? Didn’t think so. Even an old veteran like me would struggle to remember much about them. They can usually be found slumming it against the likes of the Entertainer’s Guild or the Fool’s Guild, and I think that company speaks for itself. 
    <br><br>
    I don’t know what the bigger mystery is with this crew - how they managed to find themselves a sponsor to get here, or why they attracted the eye of the First Lady. Regardless, I don’t think this season is going to be too pretty for them. I wouldn’t be surprised if neither sticks around too long. Honour used to do wonders out there on the pitch, and I imagine she can bring just as much to a team from the sideline too – but even the First Lady needs some hint of natural talent to work with. I doubt they’ve got much of that. They’re mostly just a bunch of backwards country bumpkins. Still, best of luck to them, and the First Lady too. I suspect that they’ll need it, alright.`,
    "—Mallet,  Mason’s  Guild   "
];
const fishermen = [
    "#3AA7B8",
    "Fishermen",
    "./icons/Fishermen/Fishermen.png",
    [squaddies],
    "#000",
    `The Fish have been around for years, but just never seemed to have a great game, you know? Then one day, they had a real revival in fortunes. Couldn’t tell you what it was. All I know is that suddenly they have Guild houses springing up in every city that doesn’t already have one. And then the team got better. A lot better. Like crazy better, beating the Butchers, the Morticians, the Alchemists, and the Messengers, all the big boys. Had to get better, once the Guild got bigger, or it wouldn’t sit right. Whole bunch of new players, new sponsorship, new gear, new playbook.
    <br><br>
     Suddenly, they’re a name on the street, with a big following. But you know what the old timers all say about the poster boys and girls? That team could probably achieve even more greatness if they could just wise up. They all run around waving to the damned crowd, showboating with the ball, all touchy feely with each other whenever one of ‘em gets knocked on their arse. Never known another team like it. But that said, damn, those lads can play Guild Ball.`,
    "—Flint, Mason’s Guild Team Vice Captain"
];
const hunters = [
    "#2C5726",
    "Hunters",
    "./icons/Hunters/Hunters.png",
    [squaddies],
    "#000",
    `The Hunter’s Guild is one of the oldest Guilds out there, been plying their trade for hundreds of years. They just don’t have Guild houses like anyone else, nor trade their services in the cities. And until now, they’ve never had a Guild Ball team neither. 
    <br><br>
    Your average Hunter is a real strange individual. They believe in the old gods, the Moon Goddess and Sun Father; the whole Guild is built around their worship. The Moon Goddess is the mistress o’ the hunt, the one they all off er their praises to for their work. She blesses them to steal from the Sun Father, who nurtures the world. 
    <br><br>
    They’re dangerous, young blood. Every single one of them bears respecting. Each has lived a life of tracking, pursuing, and killing beasts far more feral and dangerous than you or I have ever seen. They bring a different set o’ skills to the game, something we’ve never seen before. I won’t say that any of us were looking in their direction and dreading this day, because we weren’t. But believe me; we should have remembered them and their old ways, young blood, because now they’re here to stay.`,
    "—Greyscales, Fisherman’s Guild Vice Captain"
];
const masons = [
    "#396AB1",
    "Masons",
    "./icons/Masons/Masons.png",
    [squaddies],
    "#000",
    `When the Century Wars broke out, every Sovereign State came to the Mason’s Guild for fortifications, giving the Guild near unmatched power in the early years of the conflict. Power came with a cost, however, and the Century Wars had a sting in the tail for the Masons. After an initial investment of capital in battlements, forts, and barracks across the Sovereign States, spending was prioritised on the upkeep and training of the immense armies.
    <br><br>
     As the initial hope that the conflict would expire in timely fashion dwindled, so too did the fortunes of the Guild. The slow restoration of the Guild meant a timid start once Guild Ball was established and for many years, the Mason’s Guild was unknown. It remained so until inter-Guild politics conspired to produce a new Master Artificer. New focus was put into building a strong, reinforced Guild Ball team. Signifi cant investment followed, and the Mason’s Guild surprised the world, beating the Butcher’s Guild in the season final.
    <br><br>
    The Masons’ Guild? Rock solid. Safe as houses, if you’ll forgive the pun. No? Rough crowd tonight.`,
    "—Spigot, Brewer’s Guild"
];
const miners = [
    "#7F1715",
    "Miners",
    "./icons/Miners/Miners.png",
    [squaddies],
    "#000",
    `Blasted dangerous profession, one look at most of ‘em will prove that. Their crew looks beaten up before they hit the pitch, let alone afterwards. That’s nothing new though. You’ve got to have stones made of iron to go down in the depths day after day. Or be half mad. Preferably both, if you ask me. 
    <br><br>
    Rumour is, old Ballista set up shop with ‘em months ago. I’ll bet that suits the dour bastard right down to the ground, spending all his days in the dark, tinkering with the bloody monstrosities he’s been making. I thought I’d seen it all with the Engineers, but the mining engines are something else. You’d think they’d be against the rules, until you remember the rules were written when people couldn’t even imagine a damn drilling machine, let alone make them illegal. 
    <br><br>
    I’ll wager the Lord Artificer is the reason they’re here in the Big Leagues, too. He might not be in his Guild’s best graces, but don’t think Ballista doesn’t still have friends in high places. Mark my words, it’s a power play — he’s seen the First Lady’s success story and he’s looking to write one of his own...`,
    "—Lucky, Free Agent"
];
const morticians = [
    "#2A2A2D",
    "Morticians",
    "./icons/Morticians/Morticians.png",
    [squaddies],
    "#000",
    `Real old Guild, the Mortician’s. Guess if there’s one certainty in this life, it’s death, eh? I don’t think that they suffered none in the Century Wars when everyone else did. When your business is death, a war is good news I s’ppose. 
    <br><br>
      Everyone hates playing them. Not one team out there that can’t find something to not like about ‘em. Players come and go, but whoever they are they’re always there to trip you up, block your plays, and gang up on you. They used to be less hassle mind, but since the Ferryman took over, that’s when they got to be tough.
      <br><br>
       The Spooks might look like a circus of freaks, but each one of them is nails. Can’t take your eye off of any of them. You’re going to find you have to deal with them a lot differently to any other team, young blood. Odds are even a Meathead is going to leave you alone if he takes you out, but the Spooks? Well, best not let yourself find out whether you’re going to get lucky, or be their next customer, if you catch my drift.`,
    "—Greyscales, Fisherman’s Guild Vice Captain"
];
const navigators = [
    "#34B1C9",
    "Navigators",
    "./icons/Navigators/Navigators.png",
    [squaddies],
    "#000",
    `Pah! The Navigator’s Guild? Hear them talk, you’d think they’re the only ones who can chart a bloody map. There’s plenty of misguided folk who actually buy into that crap, too; I don’t doubt many a halfway-competent Spyglass takes coin from such hires. Of course, most of ‘em earn a pretty penny from less reputable activities, to boot. 
    <br><br>
    The buccaneers are the worst of ’em. Oh, they claim to be adventurers, noble heroes charting new seas out on the frontier — but that lie smells worse than the otter’s arse. They’re nothing more than smugglers, for my money. Windfinder isn’t the worst by far, but she’s infamous enough — her and her ship, the Freebooter’s Bounty. Her ilk came about once the Pirate King left the seas, but rumour is the Navigator’s Guild have been forced to rethink their options now a new tyrant has risen. 
    <br><br>
    They’ve no stomach for a fight, the cowards. The sooner this arrangement runs its course, the better. I don’t trust Windfinder, or her blasted crew. I’d like nothing better than to introduce most of ’em to the captain’s daughter, see that wipe the grin from their smug faces.`,
    "—Corsair, Fisherman’s Guild Team Captain"
];
const solthecian = [
    "#E6E639",
    "Solthecian",
    "./icons/Solthecian/Solthecian.png",
    [squaddies],
    "#000",
    `The Supreme Order of Solthecius? Pfft, those lads have some gall floating around a lofty name like that. To watch them strut around the pitch with all their airs, I think they believe it too. What a crock of shit. I’ll call them what they are – damned mercenaries and outcasts to a man, that’s what. No matter how good they play, they’ll never be able to hide that truth from veterans like me. 
    <br><br>
    I don’t think anyone on the pitch is blind to what the church is doing, buying up faces that people in the stands recognise. With no history behind them, they couldn’t very well drop a team into the big leagues and expect a following overnight, after all. Still, it hasn’t made them any friends, believe me. There’s a reason most of their number were able to jump ship from their old teams, and it’s no secret most were pushed. Bad combination, that.
    <br><br>
     An institution universally hated by the Guilds – and their team full of men and women most would rather stick with a knife than shake their hand. That might sound hard, lad, but go ask any of the Butchers about Brisket, you’ll see what I mean in a hurry.`,
    "— Corsair, Fisherman’s Guild"
];
const ratcatchers = [
    "#252729",
    "Ratcatchers",
    "./icons/Ratcatchers/Ratcatchers.png",
    [squaddies],
    "#000",
    `The Ratcatchers? Tiny Guild, three or four old men lording it over a handful of cities, that’s all, lad. They pay contracts rather than keep their own trappers - but it’s who they’re in bed with that really rankles. Wouldn’t like to guess whether it was the Ratcatcher’s Guild who took the first step into the depths, or whether it was the scum who came to them first. I don’t suppose it really matters. 
    <br><br>
    There are some people you don’t want to empower, and the denizens of the undercities are definitely amongst them. Most have survived for years as petty thieves, whores, or pickpockets, and they would be considered the most respectable of their brood. Go further down and those shadows hide murderers and outlaws, men and women with a past bloody enough to make a Butcher blush. 
    <br><br>
    And now? Thanks to the sponsorship of the Mortician’s Guild this horde has spilled into the light of the sun, come to dirty our pitches with their filth. Never thought I’d hear myself say it, but I’m glad for once old Greyscales isn’t here, so he doesn’t have to see it. Vermin, that’s all they are. Filthy, disgusting rodents, more akin to their quarry than to men like you or I.`,
    "—Mallet, Mason’s Guild"
];
const union = [
    "#632576",
    "Union",
    "./icons/Union/Union.png",
    [squaddies],
    "#000",
    `The Union? Dead and gone now, thankfully. And good riddance to them too, the bloodthirsty bastards. Near ruined the game for all of us, back in the day. The Tyrant had his people everywhere, lurking in the shadows like the craven mutts they were. Forced their way into our teams and ran roughshod over the sport. Didn’t matter if you won or lost, you were just happy to see the back of them. And that was before the Usurper took charge. 
    <br><br>
    I never thought I’d hear myself saying this, but I almost found myself missing the Pirate King before too long. Rage was none too subtle with his brand of violence, a wounded animal lashing out at anything that dared to draw close. Whored his team with the same abandon too. Before too long, any of the clever manipulation we saw from Blackheart was gone, replaced by a lust for cold, hard money. Believe me, I’ve seldom seen people so happy as they were when the Union were broken. The only thing we worry about now is that someone new will come along, and a third dynasty will dawn upon us...`,
    "—Mallet, Mason’s Guild"
];
