/**
 * Curated image library organized by category.
 * Each entry is either a pre-formatted prompt section string OR a
 * structured `LabeledSection` with per-photo descriptions. Labeled
 * sections give the AI content hints so it can match a specific photo
 * to the right section (e.g. pick "tiramisu dessert" for the dessert
 * card, not a random pasta shot).
 */

export type LabeledPhoto = { id: string; desc: string };
export type LabeledSection = { title: string; photos: LabeledPhoto[] };
export type ImageSection = string | LabeledSection;

export const IMAGE_SECTIONS: Record<string, ImageSection> = {
  "gym-venue": {
    title: "Gym/Fitness — Venue & Equipment",
    photos: [
      { id: "photo-1534438327276-14e5300c3a48", desc: "modern gym interior with machines, wide shot" },
      { id: "photo-1571019614242-c5c5dee9f50b", desc: "weight rack with dumbbells, equipment detail" },
      { id: "photo-1549060279-7e168fcee0c2", desc: "industrial gym space with squat racks" },
      { id: "photo-1540497077202-7c8a3999166f", desc: "kettlebells lined up, functional fitness equipment" },
      { id: "photo-1517836357463-d25dfeac3438", desc: "gym floor with cardio machines, treadmill row" },
      { id: "photo-1576678927484-cc907957088c", desc: "barbell on rack, strength training setup" },
      { id: "photo-1593079831268-3381b0db4a77", desc: "boutique gym studio, atmospheric lighting" },
      { id: "photo-1558611848-73f7eb4001a1", desc: "rope and crossfit gear, athletic training space" },
    ],
  },

  "gym-people": {
    title: "Gym/Fitness — People Working Out",
    photos: [
      { id: "photo-1581009146145-b5ef050c2e1e", desc: "athlete lifting weights, focused intensity" },
      { id: "photo-1583454110551-21f2fa2afe61", desc: "person doing pushups or floor exercises" },
      { id: "photo-1550345332-09e3ac987658", desc: "fitness model mid-workout, dynamic pose" },
      { id: "photo-1574680096145-d05b474e2155", desc: "trainer coaching client, gym session" },
      { id: "photo-1597452485669-2c7bb5fef90d", desc: "woman strength training with dumbbells" },
      { id: "photo-1521791136064-7986c2920216", desc: "personal trainer with athlete, instruction" },
      { id: "photo-1517245386807-bb43f82c33c4", desc: "yoga or stretching session, mindful fitness" },
      { id: "photo-1454165804606-c3d57bc86b40", desc: "runner outdoors, cardio and endurance training" },
      { id: "photo-1571902943202-507ec2618e8f", desc: "person doing plank or core work" },
      { id: "photo-1571388208497-71bedc66e932", desc: "athlete with barbell, powerlifting moment" },
    ],
  },

  "restaurant-venue": {
    title: "Restaurant/Food — Venue & Ambiance",
    photos: [
      { id: "photo-1517248135467-4c7edcad34c4", desc: "restaurant dining room, warm ambient lighting" },
      { id: "photo-1555396273-367ea4eb4db5", desc: "bistro interior, bar seating" },
      { id: "photo-1537047902294-62a40c20a6ae", desc: "elegant fine-dining table setting, white cloth" },
      { id: "photo-1552566626-52f8b828add9", desc: "rustic café interior, wood tones" },
      { id: "photo-1559925393-8be0ec4767c8", desc: "modern minimalist restaurant interior, clean lines" },
      { id: "photo-1592861956120-e524fc739696", desc: "casual neighborhood eatery, relaxed atmosphere" },
      { id: "photo-1559329007-40df8a9345d8", desc: "industrial-style restaurant with exposed brick" },
      { id: "photo-1424847651672-bf20a4b0982b", desc: "vibrant street food or casual dining counter" },
      { id: "photo-1466978913421-dad2ebd01d17", desc: "outdoor patio dining, al fresco seating" },
      { id: "photo-1567129937968-cdad8f07e2f8", desc: "ramen bar or asian noodle counter, intimate seating" },
      { id: "photo-1559339352-11d035aa65de", desc: "open kitchen or chef's counter, watch-the-cooking design" },
      { id: "photo-1521017432531-fbd92d768814", desc: "upscale steakhouse or chophouse, dark moody dining" },
    ],
  },

  "restaurant-food": {
    title: "Restaurant/Food — Dishes",
    photos: [
      { id: "photo-1504674900247-0877df9cc836", desc: "plated dish overhead, rustic styling" },
      { id: "photo-1565299624946-b28f40a0ae38", desc: "margherita-style pizza with fresh basil and tomato, close-up" },
      { id: "photo-1473093295043-cdd812d0e601", desc: "italian pasta dish with red sauce and fresh herbs" },
      { id: "photo-1551183053-bf91a1d81141", desc: "creamy carbonara or alfredo pasta in dark bowl" },
      { id: "photo-1551892374-ecf8754cf8b0", desc: "tiramisu dessert with cocoa dusting, italian classic" },
      { id: "photo-1565958011703-44f9829ba187", desc: "elegant plated main course, fine dining" },
      { id: "photo-1482049016688-2d3e1b311543", desc: "gourmet tasting dish, artful presentation" },
      { id: "photo-1476224203421-9ac39bcb3327", desc: "fresh caprese-style salad with greens and tomatoes" },
      { id: "photo-1414235077428-338989a2e8c0", desc: "dining table with plated meal, warm ambiance" },
      { id: "photo-1542223616-740d5dff7f56", desc: "espresso shot with crema, italian coffee culture" },
      { id: "photo-1528137871618-79d2761e3fd5", desc: "wood-fired neapolitan pizza, charred crust" },
    ],
  },

  "tech": {
    title: "Tech/SaaS",
    photos: [
      { id: "photo-1551434678-e076c223a692", desc: "team collaboration around laptop, modern office" },
      { id: "photo-1460925895917-afdab827c52f", desc: "data dashboard or analytics on laptop screen" },
      { id: "photo-1519389950473-47ba0277781c", desc: "developers coding together, focused workspace" },
      { id: "photo-1504384308090-c894fdcc538d", desc: "minimal desk setup, clean tech aesthetic" },
      { id: "photo-1531297484001-80022131f5a1", desc: "code on screen close-up, programming visualization" },
      { id: "photo-1550751827-4bd374c3f58b", desc: "abstract tech background, glowing servers or hardware" },
      { id: "photo-1518770660439-4636190af475", desc: "circuit board macro, hardware detail" },
      { id: "photo-1488590528505-98d2b5aba04b", desc: "laptop with notepad, modern remote work scene" },
    ],
  },

  "portfolio": {
    title: "Portfolio/Creative",
    photos: [
      { id: "photo-1542744094-3a31f272c490", desc: "designer working on creative project, hands and tools" },
      { id: "photo-1561070791-2526d30994b5", desc: "creative workspace with art supplies and computer" },
      { id: "photo-1535016120720-40c646be5580", desc: "photographer composing shot, behind-the-scenes" },
      { id: "photo-1513364776144-60967b0f800f", desc: "design mockups and sketches on desk" },
      { id: "photo-1499744937866-d7e566a20a61", desc: "modern art piece or design exhibition" },
      { id: "photo-1542744095-fcf48d80b0fd", desc: "creative tools spread across workspace" },
      { id: "photo-1559136555-9303baea8ebd", desc: "designer reviewing portfolio on tablet" },
      { id: "photo-1542038784456-1ea8e935640e", desc: "branding deliverables and mockups, design portfolio" },
    ],
  },

  "business": {
    title: "Business/Agency",
    photos: [
      { id: "photo-1497366216548-37526070297c", desc: "modern open office, collaborative workspace" },
      { id: "photo-1552664730-d307ca884978", desc: "team meeting around table, business strategy" },
      { id: "photo-1556761175-5973dc0f32e7", desc: "business handshake or partnership moment" },
      { id: "photo-1521737711867-e3b97375f902", desc: "professional team in office hallway" },
      { id: "photo-1522071820081-009f0129c71c", desc: "team brainstorming session with sticky notes" },
      { id: "photo-1486325212027-8081e485255e", desc: "executive at desk, professional portrait" },
      { id: "photo-1485827404703-89b55fcc595e", desc: "consulting team reviewing data on screen" },
      { id: "photo-1531058020387-3be344556be6", desc: "business presentation to clients" },
    ],
  },

  "travel-destinations": `**Travel/Tourism — Destinations & Landscapes:**
photo-1507525428034-b723cf961d3e, photo-1506929562872-d5de6b6e94a8, photo-1476514525535-07fb3b4ae5f1, photo-1469474968028-56623f02e42e, photo-1501785888041-af3ef285b470, photo-1504280390367-361c6d9f38f4, photo-1530789253388-582c481c54b0, photo-1493976040374-85c8e12f0c0e, photo-1552733407-5d5c46c3bb3b, photo-1528127269322-539801943592, photo-1473625247510-8ceb1760943f, photo-1499856871958-5b9627545d1a`,

  "travel-hotels": `**Travel — Hotels & Resorts:**
photo-1566073771259-6a8506099945, photo-1582719508461-905c673771fd, photo-1571896349842-33c89424de2d, photo-1520250497591-112f2f40a3f4`,

  "real-estate": `**Real Estate/Architecture:**
photo-1600596542815-ffad4c1539a9, photo-1600585154340-be6161a56a0c, photo-1613490493576-7fde63acd811, photo-1512917774080-9991f1c4c750, photo-1600607687939-ce8a6c25118c, photo-1600566753190-17f0baa2a6c3, photo-1600585154526-990dced4db0d`,

  "beauty": `**Beauty/Spa/Wellness:**
photo-1540555700478-4be289fbec6d, photo-1544161515-4ab6ce6db874, photo-1507652313519-d4e9174996dd, photo-1515377905703-c4788e51af15, photo-1519824145371-296894a0daa9, photo-1487412720507-e7ab37603c6f`,

  "fashion": `**Fashion/Clothing:**
photo-1558171813-01ed3d751c0e, photo-1445205170230-053b83016050, photo-1490481651871-ab68de25d43d, photo-1469334031218-e382a71b716b, photo-1483985988355-763728e1935b, photo-1485462537746-965f33f7f6a7, photo-1509631179647-0177331693ae`,

  "cinema": {
    title: "Cinema/Entertainment/Streaming Thumbnails (look like movie stills)",
    photos: [
      { id: "photo-1489599849927-2ee91cede3ba", desc: "movie theater red seats, empty auditorium" },
      { id: "photo-1536440136628-849c177e76a1", desc: "vintage cinema marquee, film reel feel" },
      { id: "photo-1440404653325-ab127d49abc1", desc: "cinematic city lights at night, atmospheric" },
      { id: "photo-1478720568477-152d9b164e26", desc: "dark moody scene, film-still composition" },
      { id: "photo-1485846234645-a62644f84728", desc: "concert crowd, dramatic stage lighting" },
      { id: "photo-1524985069026-dd778a71c7b4", desc: "popcorn bucket, cinema snack close-up" },
      { id: "photo-1594909122845-11baa439b7bf", desc: "film projector beam, dark theater interior" },
      { id: "photo-1616530940355-351fabd9524b", desc: "dramatic portrait, cinematic lighting" },
      { id: "photo-1585951237313-1979e4df7385", desc: "movie clapperboard and film reels, production" },
    ],
  },

  "nature": `**Nature/Landscapes — Cinematic & Atmospheric:**
photo-1470071459604-3b5ec3a7fe05, photo-1441974231531-c6227db76b6e, photo-1472214103451-9374bd1c798e, photo-1506905925346-21bda4d32df4, photo-1519681393784-d120267933ba, photo-1500534314263-a3c090dab376, photo-1518173946687-a4c04699c559, photo-1465056836900-8f1e940b2dc8, photo-1433086966358-54859d0ed716, photo-1470252649378-9c29740c9fa8, photo-1501854140801-50d01698950b, photo-1464822759023-fed622ff2c3b, photo-1486870591958-9b9d0d1dda99, photo-1518837695005-2083093ee35b, photo-1507400492013-162706c8c05e, photo-1475924156734-496f6cac6ec1`,

  "city": `**City/Urban — Skylines & Night Scenes:**
photo-1477959858617-67f85cf4f1df, photo-1480714378408-67cf0d13bc1b, photo-1449824913935-59a10b8d2000, photo-1514565131-fce0801e5785, photo-1444723121867-7a241cacace9, photo-1519501025264-65ba15a82390, photo-1470219556762-1e71f4a2ccab, photo-1534430480872-3498386e7856, photo-1519608487953-e999c86e7455`,

  "ocean": `**Ocean/Water — Serene & Dramatic:**
photo-1505118380757-91f5f5632de0, photo-1468413253725-0d5181091126, photo-1544551763-46a013bb70d5, photo-1505142468610-359e7d316be0, photo-1559535332-db9971090158, photo-1503803548695-c2a7b4a5b875, photo-1606857521015-7f9fcf423740`,

  "dark-moody": `**Dark/Moody Atmospheres:**
photo-1478760329108-5c3ed9d495a0, photo-1451187580459-43490279c0fa, photo-1419242902214-272b3f66ee7a, photo-1462331940025-496dfbfc7564, photo-1444703686981-a3abbc4d4fe3, photo-1536183922588-166604a45d81, photo-1557683316-973673baf926`,

  "music": `**Music/Events/Concerts:**
photo-1493225457124-a3eb161ffa5f, photo-1470229722913-7c0e2dbbafd3, photo-1511671782779-c97d3d27a1d4, photo-1514320291840-2e0a9bf2a9ae, photo-1459749411175-04bf5292ceea, photo-1501386761578-eac5c94b800a`,

  "food-coffee": {
    title: "Food/Coffee/Cafe",
    photos: [
      { id: "photo-1495474472287-4d71bcdd2085", desc: "latte art in white mug, overhead view" },
      { id: "photo-1501339847302-ac426a4a7cbb", desc: "espresso pour and coffee beans" },
      { id: "photo-1442512595331-e89e73853f31", desc: "cafe counter with pastries" },
      { id: "photo-1554118811-1e0d58224f24", desc: "cozy cafe interior with people" },
      { id: "photo-1559305616-3f99cd43e353", desc: "iced coffee drink, cold brew styling" },
      { id: "photo-1511920170033-f8396924c348", desc: "coffee cup with dessert, flat lay" },
      { id: "photo-1517048676732-d65bc937f952", desc: "fresh croissants and pastries on display" },
      { id: "photo-1568901346375-23c9450c58cd", desc: "smoothie bowl or healthy breakfast plate" },
      { id: "photo-1546069901-ba9599a7e63c", desc: "avocado toast and breakfast spread, modern brunch" },
      { id: "photo-1542838132-92c53300491e", desc: "barista pouring milk for latte art, behind counter" },
      { id: "photo-1488477181946-6428a0291777", desc: "fresh juices and smoothies, healthy drinks" },
      { id: "photo-1525351484163-7529414344d8", desc: "muffins or baked goods, bakery style" },
    ],
  },

  "education": `**Education/Learning:**
photo-1523050854058-8df90110c9f1, photo-1503676260728-1c00da094a0b, photo-1524178232363-1fb2b075b655, photo-1427504494785-3a9ca7044f45, photo-1481627834876-b7833e8f5570, photo-1488190211105-8b0e65b80b4e`,

  "medical": {
    title: "Medical/Healthcare",
    photos: [
      { id: "photo-1519494026892-80bbd2d6fd0d", desc: "modern hospital corridor or clinic interior" },
      { id: "photo-1538108149393-fbbd81895907", desc: "medical professional with stethoscope, portrait" },
      { id: "photo-1576091160399-112ba8d25d1d", desc: "doctor in white coat, professional headshot" },
      { id: "photo-1579684385127-1ef15d508118", desc: "patient consultation, doctor explaining" },
      { id: "photo-1551076805-e1869033e561", desc: "medical staff in clinical setting, treatment" },
      { id: "photo-1559757148-5c350d0d3c56", desc: "friendly healthcare conversation, patient care" },
      { id: "photo-1599058917212-d750089bc07e", desc: "medical equipment or operating room, modern healthcare tech" },
      { id: "photo-1554284126-aa88f22d8b74", desc: "healthcare team meeting, collaborative care" },
    ],
  },

  "automotive": `**Automotive/Cars:**
photo-1494976388531-d1058494cdd8, photo-1503376780353-7e6692767b70, photo-1544636331-e26879cd4d9b, photo-1492144534655-ae79c964c9d7, photo-1542362567-b07e54358753`,

  "interior": `**Interior Design/Home:**
photo-1618221195710-dd6b41faaea6, photo-1616486338812-3dadae4b4ace, photo-1600210492493-0946911123ea, photo-1505691938895-1758d7feb511, photo-1586023492125-27b2c045efd7, photo-1600607687939-ce8a6c25118c`,

  "sports": `**Sports/Athletics:**
photo-1461896836934-bd45ba7b6e7b, photo-1546519638-68e109498ffc, photo-1530549387789-4c1017266635, photo-1517649763962-0c623066013b, photo-1574629810360-7efbbe195018`,

  "ecommerce": `**E-commerce/Products/Shopping:**
photo-1441986300917-64674bd600d8, photo-1472851294608-062f824d29cc, photo-1556742049-0cfed4f6a45d, photo-1523275335684-37898b6baf30, photo-1491553895911-0055eca6402d, photo-1542291026-7eec264c27ff, photo-1505740420928-5e560c06d30e, photo-1526170375885-4d8ecf77b99f`,

  "abstract": {
    title: "Abstract/Textures/Gradients (decorative backgrounds)",
    photos: [
      { id: "photo-1558591710-4b4a1ae0f04d", desc: "abstract gradient texture, soft color blend" },
      { id: "photo-1579546929518-9e396f3cc809", desc: "colorful abstract pattern, vibrant" },
      { id: "photo-1557682250-33bd709cbe85", desc: "muted abstract texture, decorative neutral" },
      { id: "photo-1550684376-efcbd6e3f031", desc: "warm gradient background, pastel tones" },
      { id: "photo-1557682224-5b8590cd9ec5", desc: "subtle abstract surface, calm decorative" },
      { id: "photo-1612392061787-2d078b3e573c", desc: "fluid liquid texture, modern abstract" },
      { id: "photo-1530103862676-de8c9debad1d", desc: "geometric abstract shapes, design-friendly" },
    ],
  },

  "portraits": `**Portrait Headshots (team members, testimonials, trainers, staff):**
photo-1472099645785-5658abf4ff4e, photo-1438761681033-6461ffad8d80, photo-1500648767791-00dcc994a43e, photo-1494790108377-be9c29b29330, photo-1580489944761-15a19d654956, photo-1573496359142-b8d87734a5a2, photo-1560250097-0b93528c311a, photo-1487412720507-e7ab37603c6f, photo-1544005313-94ddf0286df2, photo-1519085360753-af0119f7cbe7, photo-1506794778202-cad84cf45f1d, photo-1534528741775-53994a69daeb, photo-1517841905240-472988babdf9, photo-1531746020798-e6953c6e8e04`,

  "lifestyle": `**Lifestyle — People & Everyday Moments:**
photo-1529156069898-49953e39b3ac, photo-1522202176988-66273c2fd55f, photo-1543269865-cbf427effbad, photo-1529333166437-7750a6dd5a70, photo-1517457373958-b7bdd4587205, photo-1516726817505-f5ed825fc08c, photo-1506869640319-fe1a24fd76cb, photo-1521737604893-d14cc237f11d, photo-1531983412531-1f49a365ffed, photo-1544027993-37dbfe43562a`,

  "lifestyle-friends": `**Lifestyle — Friends & Groups:**
photo-1529156069898-49953e39b3ac, photo-1511632765486-a01980e01a18, photo-1539635278303-d4002c07eae3, photo-1506869640319-fe1a24fd76cb, photo-1543269865-cbf427effbad, photo-1522202176988-66273c2fd55f, photo-1528605248644-14dd04022da1, photo-1523438885200-e635ba2c371e, photo-1525026198548-4baa812f1183, photo-1517457373958-b7bdd4587205`,

  "diverse-people": `**Diverse People — Editorial Portraits:**
photo-1531123897727-8f129e1688ce, photo-1507152832244-10d45c7eda57, photo-1517841905240-472988babdf9, photo-1534528741775-53994a69daeb, photo-1506794778202-cad84cf45f1d, photo-1580489944761-15a19d654956, photo-1573496359142-b8d87734a5a2, photo-1552058544-f2b08422138a, photo-1504257432389-52343af06ae3, photo-1506863530036-1efeddceb993, photo-1531891437562-4301cf35b7e4, photo-1544723795-3fb6469f5b39, photo-1503104834685-7205e8607eb9, photo-1542909168-82c3e7fdca5c`,

  "women-portraits": `**Women Portraits — Professional & Creative:**
photo-1531746020798-e6953c6e8e04, photo-1534528741775-53994a69daeb, photo-1573496359142-b8d87734a5a2, photo-1580489944761-15a19d654956, photo-1506863530036-1efeddceb993, photo-1517841905240-472988babdf9, photo-1494790108377-be9c29b29330, photo-1502823403499-6ccfcf4fb453, photo-1509967419530-da38b4704bc6, photo-1524504388940-b1c1722653e1`,

  "spring-nature": `**Spring/Flowers/Nature — Colorful & Fresh:**
photo-1490750967868-88aa4f44baee, photo-1462275646964-a0e3c11f18a6, photo-1490730141103-6cac27aaab94, photo-1487530811176-3780de880c2d, photo-1455659817273-f96807779a8a, photo-1444930694458-01babf71870c, photo-1453791052107-5c843da62d97, photo-1464822759023-fed622ff2c3b, photo-1518882120700-4b5a0e6b3927, photo-1495584816685-4bdbf65b0b13, photo-1457089328109-e5d9bd499191, photo-1526313508833-5e3f04921d96`,

  "quiet-luxury": `**Quiet Luxury — Lifestyle & Fashion:**
photo-1441986300917-64674bd600d8, photo-1469334031218-e382a71b716b, photo-1558171813-01ed3d751c0e, photo-1445205170230-053b83016050, photo-1483985988355-763728e1935b, photo-1490481651871-ab68de25d43d, photo-1515886657613-9f3515b0c78f, photo-1490114538077-0a7f8cb49891, photo-1441984904996-e0b6ba687e04, photo-1544957992-20514f595d6f`,

  "health-wellness": `**Health & Wellness — Active & Mindful:**
photo-1506126613408-eca07ce68773, photo-1544367567-0f2fcb009e0b, photo-1545205597-3d9d02c29597, photo-1518611012118-696072aa579a, photo-1507120366498-80b18bf40f64, photo-1552196563-55cd4e45efb3, photo-1571019613454-1cb2f99b2d8b, photo-1574680096145-d05b474e2155, photo-1549576490-b0b4831ef60a, photo-1508672019048-805c876b67e2`,

  "children-family": {
    title: "Children & Family",
    photos: [
      { id: "photo-1503454537195-1dcabb73ffb9", desc: "happy family moment outdoors" },
      { id: "photo-1476703993599-0035a21b17a9", desc: "child laughing or playing, joyful candid" },
      { id: "photo-1502086223501-7ea6ecd79368", desc: "kids reading or learning together" },
      { id: "photo-1513542789411-b6a5d4f31634", desc: "child playing with toys, indoor scene" },
      { id: "photo-1508214751196-bcfd4ca60f91", desc: "parent and child bonding moment" },
      { id: "photo-1516627145497-ae6968895b74", desc: "family at the beach or park together" },
      { id: "photo-1473448912268-2022ce9509d8", desc: "child running or playing outdoors, freedom" },
      { id: "photo-1607604276583-eef5d076aa5f", desc: "kids art and crafts, creative play" },
      { id: "photo-1497032628192-86f99bcd76bc", desc: "family dinner or meal together" },
      { id: "photo-1601758228041-f3b2795255f1", desc: "siblings or kids hugging, warm family moment" },
    ],
  },

  "couple-romance": `**Couple/Romance:**
photo-1529333166437-7750a6dd5a70, photo-1516589178581-6cd7833ae3b2, photo-1516967124798-10656f7dca28, photo-1518199266791-5375a83190b7, photo-1521038199265-bc482db0f923, photo-1522673607200-164d1b6ce486`,

  "dental": {
    title: "Dental/Medical — Professional",
    photos: [
      { id: "photo-1588776814546-1ffcf47267a5", desc: "dental clinic interior, modern equipment" },
      { id: "photo-1606811841689-23dfddce3e95", desc: "dentist examining patient, treatment in progress" },
      { id: "photo-1598256989800-fe5f95da9787", desc: "dental tools and instruments close-up" },
      { id: "photo-1579684385127-1ef15d508118", desc: "smiling patient after dental treatment" },
      { id: "photo-1576091160399-112ba8d25d1d", desc: "medical professional in white coat, portrait" },
      { id: "photo-1551076805-e1869033e561", desc: "dentist working with patient, clinical setting" },
      { id: "photo-1559757148-5c350d0d3c56", desc: "doctor consultation, friendly conversation" },
      { id: "photo-1612349317150-e413f6a5b16d", desc: "dental chair and lamp, treatment room" },
      { id: "photo-1629909613654-28e377c37b09", desc: "smiling woman with healthy white teeth" },
      { id: "photo-1606265752439-1f18756aa5fc", desc: "dental hygienist with patient, clean clinical scene" },
    ],
  },

  "skincare": `**Skincare/Beauty — Products & People:**
photo-1556228578-0d85b1a4d571, photo-1570172619644-dfd03ed5d881, photo-1596755389378-c31d21fd1273, photo-1512290923902-8a9f81dc236c, photo-1540555700478-4be289fbec6d, photo-1544161515-4ab6ce6db874, photo-1519824145371-296894a0daa9, photo-1515377905703-c4788e51af15, photo-1505944270255-72b8c68c6a70, photo-1571781926291-c477ebfd024b`,

  "pets": {
    title: "Pets/Animals",
    photos: [
      { id: "photo-1587300003388-59208cc962cb", desc: "happy golden retriever dog outdoors" },
      { id: "photo-1543466835-00a7907e9de1", desc: "playful puppy with toy" },
      { id: "photo-1548199973-03cce0bbc87b", desc: "dog being walked on leash" },
      { id: "photo-1583511655857-d19b40a7a54e", desc: "dog being held or pet, gentle close-up" },
      { id: "photo-1537151625747-768eb6cf92b2", desc: "cat resting on bed, peaceful indoor scene" },
      { id: "photo-1561037404-61cd46aa615b", desc: "tabby cat close-up portrait" },
      { id: "photo-1425082661705-1834bfd09dca", desc: "person hugging pet dog, bond between owner and pet" },
      { id: "photo-1574158622682-e40e69881006", desc: "small dog in grass, joyful pet moment" },
      { id: "photo-1592194996308-7b43878e84a6", desc: "pet store or pet care service interior" },
      { id: "photo-1450778869180-41d0601e046e", desc: "cat in window light, serene mood" },
    ],
  },

  "workspace": `**Creative Workspace — Desks & Tools:**
photo-1499750310107-5fef28a66643, photo-1497215842964-222b430dc094, photo-1483058712412-4245e9b90334, photo-1496181133206-80ce9b88a853, photo-1484788984921-03950022c9ef, photo-1517694712202-14dd9538aa97, photo-1498050108023-c5249f4df085, photo-1522542550221-31fd19575a2d`,
};

// ── Pexels image library ───────────────────────────────────────────

export const PEXELS_SECTIONS: Record<string, string> = {
  "lifestyle": "3184418, 3184423, 3184431, 3184360, 3184398, 3184611, 3184639, 1231365, 1181519, 3184644",
  "business":  "3182812, 3182834, 3182781, 3184292, 3184405, 3184339, 3182746, 3182765",
  "nature":    "1166209, 462118, 1028599, 1179229, 355508, 268261, 1131458, 460775",
  "fashion":   "1536619, 1488463, 1721558, 1926769, 2681751, 2068975, 1926620, 2531734",
  "food":      "1640777, 958545, 376464, 1099680, 1279330, 1109197, 1640770, 842571",
  "health":    "3822622, 3822621, 3822583, 3759657, 3759660, 3823207, 3823225, 3822906",
  "architecture": "1571460, 1571459, 276724, 1648776, 2724748, 2635038, 1457842, 3958958",
  "pets":      "1108099, 2607544, 1183434, 2023384, 1741205, 2253275, 1404819, 3687770",
  "children":  "1683975, 1648377, 1912868, 2253879, 3662630, 3662770, 1912862, 2406949",
};

// Map Unsplash categories to relevant Pexels categories
const PEXELS_MAP: Record<string, string> = {
  "lifestyle": "lifestyle", "lifestyle-friends": "lifestyle", "diverse-people": "lifestyle",
  "business": "business", "workspace": "business",
  "nature": "nature", "spring-nature": "nature", "travel-destinations": "nature",
  "fashion": "fashion", "quiet-luxury": "fashion", "women-portraits": "fashion",
  "restaurant-food": "food", "restaurant-venue": "food", "food-coffee": "food",
  "health-wellness": "health", "beauty": "health", "medical": "health",
  "real-estate": "architecture", "interior": "architecture",
  "pets": "pets",
  "children-family": "children",
};

/**
 * Render one section for the prompt. Labeled sections emit each photo
 * on its own line with a description so the AI can match content to
 * section (e.g. dessert card → tiramisu photo). String sections fall
 * through untouched for backward compatibility.
 */
function renderSection(section: ImageSection): string {
  if (typeof section === "string") return section;
  const lines = section.photos.map((p) => `- ${p.id} — ${p.desc}`).join("\n");
  return `**${section.title}:**\n${lines}`;
}

/**
 * Return the first photo ID in a category. Used as a fallback when the
 * AI emits a hallucinated or dead photo ID — the validator swaps in
 * this known-good ID from the same category.
 */
export function getCategoryFallbackId(category: string): string | null {
  const section = IMAGE_SECTIONS[category];
  if (!section) return null;
  if (typeof section === "string") {
    const match = section.match(/photo-[a-z0-9]+/);
    return match ? match[0] : null;
  }
  return section.photos[0]?.id ?? null;
}

/** Last-resort fallback when no category context is available. */
export const UNIVERSAL_FALLBACK_PHOTO = "photo-1557683316-973673baf926";

/**
 * Build the image section of the prompt for given categories.
 */
export function buildImagePrompt(categories: string[]): string {
  const unsplashSections: string[] = [];
  const pexelsCategories = new Set<string>();
  let hasLabeledSections = false;

  for (const cat of categories) {
    const section = IMAGE_SECTIONS[cat];
    if (section) {
      unsplashSections.push(renderSection(section));
      if (typeof section !== "string") hasLabeledSections = true;
    }
    // Also grab matching Pexels
    const pexelsCat = PEXELS_MAP[cat];
    if (pexelsCat && PEXELS_SECTIONS[pexelsCat]) {
      pexelsCategories.add(pexelsCat);
    }
  }

  const matchingHint = hasLabeledSections
    ? `\n- When a photo has a description, pick the one whose description best matches the section's content (e.g. a "desserts" card should use a dessert-described photo, not a random dish).`
    : "";

  let prompt = `#### Image URL Format
- Unsplash: \`https://images.unsplash.com/photo-PHOTOID?auto=format&fit=crop&q=80&w=WIDTH\`
- ONLY use photo IDs from the lists below. NEVER invent or guess photo IDs — made-up IDs return broken images.${matchingHint}
- Add \`loading="lazy"\` and \`class="object-cover"\` on all images.

#### Curated Image Library
${unsplashSections.join("\n\n")}`;

  if (pexelsCategories.size > 0) {
    const pexelsLines: string[] = [];
    for (const cat of pexelsCategories) {
      pexelsLines.push(`- **${cat.charAt(0).toUpperCase() + cat.slice(1)}:** ${PEXELS_SECTIONS[cat]}`);
    }
    prompt += `

#### Pexels (additional variety)
Format: \`https://images.pexels.com/photos/PHOTOID/pexels-photo-PHOTOID.jpeg?auto=compress&cs=tinysrgb&w=WIDTH\`
${pexelsLines.join("\n")}`;
  }

  return prompt;
}
