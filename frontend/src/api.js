// 墨问 API 封装
// 后端地址：http://localhost:8000
// 当后端不可用时，使用内置默认数据进行降级处理

const BASE_URL = 'http://localhost:8000'
const REQUEST_TIMEOUT = 6000

// ============ 默认角色数据 ============
export const DEFAULT_ROLES = [
  // 道家
  { id: 'zhuangzi', name: '庄子', avatar: '庄', school: '道家', era: '战国', style: '逍遥洒脱，以寓言破执', desc: '漆园吏，逍遥游于世，梦蝶而不知周之梦为蝶。', rate: 0.85, pitch: 0.9 },
  { id: 'laozi', name: '老子', avatar: '老', school: '道家', era: '春秋', style: '清静无为，以柔克刚', desc: '道家宗师，骑青牛出函谷，著五千言道德经。', rate: 0.8, pitch: 0.85 },
  { id: 'liezi', name: '列子', avatar: '列', school: '道家', era: '战国', style: '御风而行，虚静无为', desc: '郑国圃田人，著列子八篇，御风而行，泠然善也。', rate: 0.78, pitch: 0.88 },
  { id: 'huainanzi', name: '刘安', avatar: '安', school: '道家', era: '西汉', style: '博采众家，通天彻地', desc: '淮南王，招宾客著淮南子，融道家、阴阳、纵横于一体。', rate: 0.82, pitch: 0.92 },
  // 儒家
  { id: 'kongzi', name: '孔子', avatar: '孔', school: '儒家', era: '春秋', style: '温和中正，以仁礼立身', desc: '至圣先师，周游列国，有教无类，述而不作。', rate: 0.95, pitch: 1.0 },
  { id: 'mengzi', name: '孟子', avatar: '孟', school: '儒家', era: '战国', style: '浩然正气，舍生取义', desc: '亚圣，承孔子之道，倡性善论，行仁义之政。', rate: 0.9, pitch: 1.02 },
  { id: 'xunzi', name: '荀子', avatar: '荀', school: '儒家', era: '战国', style: '隆礼重法，化性起伪', desc: '先秦儒家集大成者，主张性恶论，礼法并重。', rate: 0.88, pitch: 0.95 },
  { id: 'dongzhongshu', name: '董仲舒', avatar: '董', school: '儒家', era: '西汉', style: '天人感应，独尊儒术', desc: '西汉大儒，罢黜百家独尊儒术，以春秋决狱。', rate: 0.85, pitch: 0.93 },
  { id: 'wangyangming', name: '王阳明', avatar: '阳', school: '儒家', era: '明代', style: '知行合一，以心破障', desc: '心学宗师，龙场悟道，致良知，知行合一。', rate: 0.92, pitch: 0.98 },
  // 兵家
  { id: 'sunzi', name: '孙子', avatar: '孙', school: '兵家', era: '春秋', style: '谋定后动，以智取胜', desc: '兵圣，著孙子兵法十三篇，知己知彼，百战不殆。', rate: 1.0, pitch: 1.05 },
  { id: 'zhugeliang', name: '诸葛亮', avatar: '亮', school: '兵家', era: '三国', style: '鞠躬尽瘁，神机妙算', desc: '蜀汉丞相，隆中对策，北伐中原，出师未捷身先死。', rate: 0.93, pitch: 0.97 },
  { id: 'fanli', name: '范蠡', avatar: '范', school: '兵家', era: '春秋', style: '深谋远虑，功成身退', desc: '越国大夫，助勾践复国，后泛舟五湖，三致千金。', rate: 0.87, pitch: 0.91 },
  // 法家
  { id: 'hanfeizi', name: '韩非子', avatar: '韩', school: '法家', era: '战国', style: '法势术兼用，以法治国', desc: '法家集大成者，荀子弟子，著韩非子五十五篇。', rate: 0.86, pitch: 0.96 },
  { id: 'guanzi', name: '管子', avatar: '管', school: '法家', era: '春秋', style: '通货积财，富国强兵', desc: '齐国上卿，辅佐齐桓公称霸，轻重之术治国。', rate: 0.84, pitch: 0.94 },
  // 墨家
  { id: 'mozi', name: '墨子', avatar: '墨', school: '墨家', era: '战国', style: '兼爱非攻，摩顶放踵', desc: '墨家创始人，兼爱非攻，尚贤节用，摩顶放踵以利天下。', rate: 0.83, pitch: 0.89 },
  // 纵横家
  { id: 'guiguzi', name: '鬼谷子', avatar: '鬼', school: '纵横家', era: '战国', style: '捭阖纵横，神鬼莫测', desc: '纵横家鼻祖，通天彻地，弟子苏秦张仪纵横天下。', rate: 0.9, pitch: 0.88 },
  // 杂家
  { id: 'liubowen', name: '刘伯温', avatar: '刘', school: '杂家', era: '明代', style: '经天纬地，料事如神', desc: '明朝开国谋臣，通经史、晓天文、精兵法，著郁离子。', rate: 0.88, pitch: 0.95 },
  { id: 'zhengguofan', name: '曾国藩', avatar: '曾', school: '杂家', era: '清代', style: '拙诚笃敬，挺经处世', desc: '晚清名臣，修身齐家治国，著家书，以拙胜巧。', rate: 0.86, pitch: 0.92 },
  // 文学
  { id: 'sushi', name: '苏轼', avatar: '苏', school: '文学', era: '北宋', style: '旷达超然，诗酒趁年华', desc: '东坡居士，诗词书画无一不精，一蓑烟雨任平生。', rate: 0.89, pitch: 0.96 },
  { id: 'taoyuanming', name: '陶渊明', avatar: '陶', school: '文学', era: '东晋', style: '归隐田园，悠然自得', desc: '五柳先生，不为五斗米折腰，采菊东篱下，悠然见南山。', rate: 0.81, pitch: 0.87 },
  // 周易
  { id: 'zhouyi', name: '周文王', avatar: '文', school: '周易', era: '商末', style: '演卦推天，穷理尽性', desc: '西伯侯姬昌，演周易八卦，推演天地万物之理。', rate: 0.91, pitch: 0.9 },
]

// ============ 默认场景数据 ============
export const DEFAULT_SCENES = [
  {
    id: 'workplace',
    label: '职场内卷',
    icon: '卷',
    question: '同事都在加班卷绩效，我不卷怕被淘汰，卷了又身心俱疲，该怎么办？',
    suggestRole: 'zhuangzi',
  },
  {
    id: 'relationship',
    label: '感情纠结',
    icon: '情',
    question: '一段感情明知没有结果，却总是放不下，反复纠缠，我该如何自处？',
    suggestRole: 'laozi',
  },
  {
    id: 'social',
    label: '社交焦虑',
    icon: '社',
    question: '每次社交场合都紧张到说不出话，害怕别人的评价，怎样才能自在一些？',
    suggestRole: 'kongzi',
  },
  {
    id: 'mental',
    label: '精神内耗',
    icon: '耗',
    question: '脑子里总在想东想西，什么事都没做却觉得精疲力竭，如何停止内耗？',
    suggestRole: 'wangyangming',
  },
  {
    id: 'choice',
    label: '选择困难',
    icon: '择',
    question: '面临人生重要选择，左也不是右也不是，迟迟不敢做决定，怎么办？',
    suggestRole: 'sunzi',
  },
  {
    id: 'action',
    label: '知行困境',
    icon: '行',
    question: '道理我都懂，可就是做不到，知行之间总隔着一道坎，如何跨越？',
    suggestRole: 'wangyangming',
  },
]

// 今日一问
export const DEFAULT_TODAY = {
  question: '三十而立的年纪，一事无成，看着同龄人各有成就，我该如何安放这颗焦虑的心？',
  suggestRole: 'kongzi',
}

// ============ 默认回答库（按角色分类）============
// 每个角色有多组回答，根据问题关键词匹配，无匹配则用通用回答
const ANSWER_LIBRARY = {
  zhuangzi: [
    {
      match: ['卷', '加班', '绩效', '累', '疲惫', '工作', '职场', '淘汰', '竞争'],
      quote: '泉涸，鱼相与处于陆，相呴以湿，相濡以沫，不如相忘于江湖。',
      source: '《庄子·大宗师》',
      plain: '泉水干涸了，鱼儿困在陆地上，互相吐沫来保持湿润。与其这样苦苦相守，不如各自游向广阔的江湖，彼此相忘于自由之中。',
      interpretation: '你怕被淘汰，所以拼命卷。可你想过没有，这条"涸泉"本身值不值得待？庄子说，与其在干涸的池子里和别的鱼比谁吐的沫多，不如跳出去找属于你的江湖。内卷的本质是所有人挤在同一个狭小的评价体系里。真正的逍遥，不是卷赢别人，而是找到那片让你自在游弋的水域。退一步，未必是认输，可能是换一片海。',
      suggestions: ['我该如何找到属于自己的"江湖"？', '不卷的话，靠什么立足？', '逍遥是不是就是躺平？'],
    },
    {
      match: ['放不下', '感情', '纠缠', '失恋', '分手', '爱', '执念'],
      quote: '相濡以沫，不如相忘于江湖。',
      source: '《庄子·大宗师》',
      plain: '与其在困境中互相用口水润湿对方、苦苦相守，不如各自回到广阔的江湖中，彼此相忘，各自安好。',
      interpretation: '你明知没有结果却放不下，就像两条困在车辙里的鱼，靠彼此的口水续命。你以为这是深情，庄子却说是执念。真正的爱，不是在干涸里互相消耗，而是让彼此回到各自的江湖里畅游。放下，不是无情，而是成全——成全对方，也成全自己。相忘于江湖，才是最大的慈悲。',
      suggestions: ['怎样才能真正放下一个人？', '相忘于江湖是不是逃避？', '执念的本质是什么？'],
    },
    {
      match: ['焦虑', '三十', '一事无成', '成就', '同龄', '比较', '年龄'],
      quote: '小知不及大知，小年不及大年。奚以知其然也？朝菌不知晦朔，蟪蛄不知春秋。',
      source: '《庄子·逍遥游》',
      plain: '小聪明比不上大智慧，短命的不及长寿的。怎么知道呢？朝生暮死的菌类不知道什么是昼夜交替，夏生秋死的蝉不知道什么是四季轮回。',
      interpretation: '你拿自己和同龄人比，焦虑"一事无成"。可庄子说，你用的是"小年"的尺度——朝菌不知晦朔，蟪蛄不知春秋。你眼中的"三十而立"，不过是一种世俗的计时法。大鹏一飞就是九万里，它从不和麻雀比谁先到枝头。你的焦虑，来自用别人的时间表丈量自己的人生。别急，也许你是大鹏，只是还没到乘风的时候。',
      suggestions: ['我怎么知道自己是不是"大鹏"？', '不比较的话，怎么衡量自己？', '逍遥的境界如何达到？'],
    },
    {
      match: ['自在', '自由', '束缚', '不快乐', '意义', '虚无'],
      quote: '至人无己，神人无功，圣人无名。',
      source: '《庄子·逍遥游》',
      plain: '境界至高的人忘掉了自我，神妙的人不追求功业，圣人不追求名声。',
      interpretation: '你觉得不自在，是因为"己"太重了——太在意自己的得失、名声、成就。庄子说，真正的逍遥是"无己"：不再把"我"放在世界的中心。当你不再执着于"我要成功""我要被认可"，反而能像风一样自由穿行于万物之间。这不是消极，而是卸下了一副你根本不需要扛的铠甲。',
      suggestions: ['无己会不会失去自我？', '如何在现实中做到逍遥？', '逍遥和责任矛盾吗？'],
    },
  ],
  kongzi: [
    {
      match: ['社交', '紧张', '说不出话', '害怕', '评价', '人', '场合'],
      quote: '君子坦荡荡，小人长戚戚。',
      source: '《论语·述而》',
      plain: '君子心胸开阔、坦然自在，小人却总是忧愁不安、患得患失。',
      interpretation: '你社交时紧张，是因为太在意别人的评价——这正是"长戚戚"。孔子说，君子之所以坦荡荡，不是因为不在乎别人，而是因为他问心无愧。你不需要讨好所有人，也不需要每句话都说得漂亮。把注意力从"别人怎么看我"转到"我是否真诚待人"，紧张自然就淡了。真诚，是最好的社交技巧，也是最轻的铠甲。',
      suggestions: ['怎样做到问心无愧？', '真诚会不会被人利用？', '君子如何处理不喜欢的人？'],
    },
    {
      match: ['焦虑', '三十', '一事无成', '成就', '同龄', '年龄', '立'],
      quote: '三十而立，四十而不惑，五十而知天命。',
      source: '《论语·为政》',
      plain: '三十岁能自立于世，四十岁能不被外界迷惑，五十岁能懂得天命所在。',
      interpretation: '你焦虑"三十而立"，可你真的理解孔子说的"立"吗？它不是指有房有车有地位，而是指立住自己的志向和原则——知道这辈子要做什么样的人。孔子十五岁立志向学，到三十才"立"，中间花了十五年。你拿世俗的成就去丈量"立"，当然焦虑。真正的"立"，是内心有了定海神针，外界的风浪便动摇不了你。先问自己：我立的是什么？',
      suggestions: ['如何找到自己的志向？', '不惑到底是什么境界？', '天命可以改变吗？'],
    },
    {
      match: ['选择', '决定', '犹豫', '左右', '不敢', '迷茫'],
      quote: '三思而后行。',
      source: '《论语·公冶长》',
      plain: '做事之前要反复思考然后再行动。',
      interpretation: '你犹豫不决，以为多想就能想明白。但孔子原本说这话时，其实是在批评一个人想太多——"再，斯可矣"，想两次就够了。选择困难，往往不是因为选项太多，而是因为你害怕承担后果。孔子教你的是：想清楚最坏的结果你能不能接受，能接受就果断去做。犹豫本身也是一种选择，而且通常是最差的那种。行动，哪怕不完美，也比原地打转强。',
      suggestions: ['如何判断什么时候该果断？', '选错了怎么办？', '三思和果断矛盾吗？'],
    },
    {
      match: ['学习', '读书', '成长', '进步', '提升', '知识'],
      quote: '学而不思则罔，思而不学则殆。',
      source: '《论语·为政》',
      plain: '只学习不思考就会迷惘，只思考不学习就会危险。',
      interpretation: '你可能在两个极端之间摇摆：要么疯狂囤课囤书却不消化，要么整天空想却不肯下功夫学。孔子说这两样都不行。学和思是一对翅膀，缺一个都飞不起来。真正的成长，是把学来的东西经过自己的思考，变成自己的判断。下次读书，别急着翻下一页，停下来问自己：这和我有什么关系？我能用它做什么？',
      suggestions: ['如何平衡学和思？', '读书读不进去怎么办？', '学的最终目的是什么？'],
    },
  ],
  laozi: [
    {
      match: ['卷', '加班', '绩效', '累', '疲惫', '工作', '职场', '竞争', '强'],
      quote: '上善若水。水善利万物而不争，处众人之所恶，故几于道。',
      source: '《道德经·第八章》',
      plain: '最高的善就像水一样。水善于滋润万物却不与万物相争，停留在众人都不愿去的低处，所以最接近"道"。',
      interpretation: '你觉得不卷就会被淘汰，可老子看到的逻辑正好相反。水不争，却无处不到、无物不润。它往低处流，反而汇聚成江海。职场里，那些不争功、肯做事、愿意待在别人不愿待的位置上的人，往往走得更远。不是让你做老好人，而是让你像水一样——有力量，但不炫耀；有方向，但不硬碰。不争，不是不努力，是不把力气花在和别人较劲上。',
      suggestions: ['不争怎么获得认可？', '水的智慧如何用在职场？', '柔弱如何胜刚强？'],
    },
    {
      match: ['放不下', '感情', '纠缠', '失恋', '分手', '执念', '爱'],
      quote: '持而盈之，不如其已；揣而锐之，不可长保。',
      source: '《道德经·第九章》',
      plain: '端着一杯水满了还继续倒，不如适时停下；把刀锋磨得太锐利，锋芒保持不了多久。',
      interpretation: '你放不下，是因为你想"持而盈之"——把一段已经结束的感情端得满满的，不肯让它空出来。老子说，满了就该停了。杯子不空，新的水怎么倒得进去？你执着于"圆满"，却忘了"已"也是一种智慧。放下不是失去，是给生命腾出空间。月满则亏，水满则溢，感情到了该停的时候，停下来，才是对彼此最大的善意。',
      suggestions: ['如何判断什么时候该"已"？', '空出来的空间用来做什么？', '无为在感情中怎么理解？'],
    },
    {
      match: ['焦虑', '急', '快', '三十', '成就', '年龄', '慢'],
      quote: '企者不立，跨者不行。',
      source: '《道德经·第二十四章》',
      plain: '踮起脚尖站不稳，步子跨太大走不远。',
      interpretation: '你焦虑"一事无成"，想赶紧追上别人——这正是"企者"和"跨者"。踮着脚看似高了，其实站不久；跨大步看似快了，其实走不远。老子告诉你：慢一点，反而快。急着在三十岁证明自己，不如先把根扎深。大树不是一天长成的，但它一旦长成，风雨也撼不动。你的焦虑，来自用短跑的方式跑马拉松。调整节奏，按自己的步调来。',
      suggestions: ['如何找到自己的节奏？', '慢会不会被时代抛弃？', '无为就是不作为吗？'],
    },
    {
      match: ['控制', '改变', '强求', '无力', '做不到', '应该'],
      quote: '为者败之，执者失之。是以圣人无为，故无败；无执，故无失。',
      source: '《道德经·第二十九章》',
      plain: '强行去做就会失败，强行把持就会失去。因此圣人不妄为，所以不会失败；不执着，所以不会失去。',
      interpretation: '你总想控制一切——控制结果、控制别人、控制命运。老子说，越是用力抓，越容易碎。这不是让你放弃，而是让你分清"能做的"和"不能控的"。尽力去做，但不执着于结果。你种下种子，浇水施肥是你的事，但什么时候发芽、结什么果，有它自己的节奏。放下控制欲，不是消极，是顺势而为——像水一样，遇到石头绕过去，但终归会流向大海。',
      suggestions: ['无为和躺平有什么区别？', '如何做到尽力但不执着？', '顺势而为如何判断"势"？'],
    },
  ],
  sunzi: [
    {
      match: ['选择', '决定', '犹豫', '战略', '规划', '方向', '迷茫'],
      quote: '知己知彼，百战不殆；不知彼而知己，一胜一负；不知彼，不知己，每战必殆。',
      source: '《孙子兵法·谋攻篇》',
      plain: '了解自己也了解对手，百战百胜不会有危险；不了解对手但了解自己，胜负各半；既不了解对手也不了解自己，每战必败。',
      interpretation: '你选择困难，是因为既不知己也不知彼。不知己——不清楚自己真正想要什么、能承受什么；不知彼——不了解每个选项背后的真实代价和收益。孙子说，做决策就像打仗，先做情报工作。拿出一张纸，左边写"我有什么、怕什么、要什么"，右边写每个选项的利弊。当信息摆清楚了，决定往往自己就浮出来了。犹豫，多半是因为信息不足。',
      suggestions: ['如何真正"知己"？', '信息不足时怎么决策？', '决策后如何执行到位？'],
    },
    {
      match: ['卷', '竞争', '职场', '淘汰', '对手', '赢'],
      quote: '胜可知，而不可为。不可胜者，守也；可胜者，攻也。',
      source: '《孙子兵法·军形篇》',
      plain: '胜利可以预见，但不能强求。自己无法被战胜时，就防守；敌人可以被战胜时，就进攻。',
      interpretation: '职场内卷，你总想着怎么赢过别人。但孙子说，先别想赢，先想"怎么不被打败"。把自己修炼到无可替代，这是"守"——先立于不败之地。然后等对手露出破绽，再"攻"。内卷的人都在抢同一个位置，你不如先打造自己的护城河。与其和别人比谁加班晚，不如比谁不可替代。胜利不是抢来的，是熬出来的、等来的、准备来的。',
      suggestions: ['如何打造自己的护城河？', '什么时候该攻什么时候该守？', '如何发现对手的破绽？'],
    },
    {
      match: ['焦虑', '急', '风险', '害怕', '失败', '担心'],
      quote: '多算胜，少算不胜，而况于无算乎！',
      source: '《孙子兵法·始计篇》',
      plain: '筹划周密就能取胜，筹划不周就会失败，更何况根本不筹划呢！',
      interpretation: '你的焦虑，很大程度来自"少算"或"无算"——脑子里一团乱麻，却没有系统地把事情想清楚。孙子说，打仗之前先在庙堂上算一算，算赢了再打。你的焦虑不是因为你面临的局面太复杂，而是你没有把复杂局面拆解成可操作的步骤。把最坏情况列出来，把应对方案写下来，把每一步的得失算清楚。当未知变成已知，焦虑就变成了预案。',
      suggestions: ['如何系统地"算"一件事？', '算太多会不会错过时机？', '预案做不到怎么办？'],
    },
    {
      match: ['行动', '执行', '拖延', '做不到', '开始', '知行'],
      quote: '兵之情主速，乘人之不及，由不虞之道，攻其所不戒也。',
      source: '《孙子兵法·九地篇》',
      plain: '用兵的关键在于迅速，趁敌人来不及防备，走它意想不到的路，攻击它没有戒备的地方。',
      interpretation: '你道理都懂却做不到，多半卡在"迟迟不行动"。孙子说，兵贵神速——不是莽撞地快，而是看准了就果断出手。拖延的本质是你在等一个"完美时机"，但完美时机永远不会来。与其等到万事俱备，不如在七成把握时就动起来，边走边调整。行动本身就是最好的计划，因为只有在行动中你才能看到真实的地形。先动起来，比想清楚更重要。',
      suggestions: ['如何克服拖延立刻行动？', '七成把握就动会不会太冒险？', '行动中如何调整方向？'],
    },
  ],
  wangyangming: [
    {
      match: ['知行', '做不到', '道理都懂', '行动', '拖延', '跨越', '坎'],
      quote: '知是行之始，行是知之成。若会得时，只说一个知，已自有行在。',
      source: '《传习录·徐爱录》',
      plain: '知是行的开端，行是知的完成。如果真正理解了，只说一个"知"，行就已经在其中了。',
      interpretation: '你说"道理都懂就是做不到"，王阳明会告诉你：你根本没懂。在他看来，知和行是一回事——真知必能行，不行不是真知。你觉得"懂"的那个道理，只是耳朵听过了、脑子记住了，但没有真正"致"到心里去。就像你知道火会烫，你绝不会把手伸进去——那才是真知。你"做不到"的那些道理，其实你并没有真正相信它。破局的关键，不是再多学一个道理，而是挑一条，真的去做到一次。',
      suggestions: ['如何把"知道"变成"真知"？', '致良知具体怎么做？', '知行合一的起点在哪里？'],
    },
    {
      match: ['内耗', '想东想西', '精疲力竭', '脑子', '停不下来', '胡思乱想'],
      quote: '破山中贼易，破心中贼难。',
      source: '《王文成公全书·与杨仕德薛尚谦》',
      plain: '打败山里的贼寇容易，打败心里的贼寇却很难。',
      interpretation: '你脑子停不下来地想东想西，这就是"心中贼"。王阳明说，打败外面的敌人容易，打败心里的敌人难。你的内耗，不是外界造成的，是你心里的贼在作祟——患得患失的贼、自我怀疑的贼、恐惧未来的贼。怎么破？阳明先生说"致良知"：当你又开始内耗时，问自己一句——此刻我该做什么？把注意力从"想"拉回到"做"。心贼最怕的就是行动，你一动，它就弱了。',
      suggestions: ['如何识别自己的"心中贼"？', '致良知和内耗什么关系？', '心学如何日常修炼？'],
    },
    {
      match: ['焦虑', '三十', '一事无成', '成就', '迷茫', '意义'],
      quote: '人胸中各有个圣人，只自信不及，都自埋倒了。',
      source: '《传习录·钱德洪录》',
      plain: '每个人心中都有一个圣人，只是自己信心不够，把自己心中的圣人给埋没了。',
      interpretation: '你焦虑"一事无成"，是因为你把"成就"的定义交给了外界。王阳明说，你心里本来就有一个圣人——不是要你成圣成贤，而是说你本自具足，不假外求。你的焦虑，来自"自信不及"，总觉得自己不够好、不够成功。可真正的成就，不是外在的标签，而是活出内心的良知。三十岁一事无成又如何？只要你开始倾听内心的声音，按良知去活，每一刻都是"成"。',
      suggestions: ['如何找到心中的"圣人"？', '自信不及怎么破？', '良知和世俗成功矛盾吗？'],
    },
    {
      match: ['选择', '犹豫', '决定', '对错', '后悔', '害怕错'],
      quote: '此心光明，亦复何言。',
      source: '《王阳明临终遗言》',
      plain: '这颗心已经光明磊落，还有什么可说的呢。',
      interpretation: '你害怕选错，犹豫不决。王阳明临终说"此心光明，亦复何言"——他这辈子做了无数选择，有成功有失败，但他说：只要心是光明的，就够了。选择的对错，不在于结果，而在于你做选择时是否对得起自己的良知。你怕选错，其实是怕后悔。可如果你每个选择都出于真心、出于良知，就没有什么可后悔的。光明的心，不怕走错路，因为每条路都是修行。',
      suggestions: ['如何让心保持"光明"？', '出于良知的选择一定对吗？', '如何面对已经选错的事？'],
    },
  ],
}

// 通用回答（当关键词都不匹配时使用）
const GENERIC_ANSWERS = {
  zhuangzi: {
    quote: '天地与我并生，而万物与我为一。',
    source: '《庄子·齐物论》',
    plain: '天地与我同时诞生，万物与我合而为一。',
    interpretation: '你问的问题，说到底都是"我"与"外物"的关系。庄子说，天地万物本是一体，是你的心把它们分出了"我"和"非我"，才有了烦恼。试着退后一步，用更大的尺度看你的困惑——在天地之间，它真的有那么重要吗？逍遥，不是没有问题，是不被问题困住。',
    suggestions: ['如何用更大的尺度看问题？', '万物为一是什么体验？', '逍遥的起点在哪里？'],
  },
  kongzi: {
    quote: '己所不欲，勿施于人。',
    source: '《论语·颜渊》',
    plain: '自己不希望承受的事，也不要强加给别人。',
    interpretation: '无论你面临什么困惑，都可以用这一句话来丈量。孔子说，做人的根本在于"恕"——推己及人。你纠结的事，不妨换个角度：如果对方是你，你希望被怎样对待？答案往往就在这个换位之中。仁，不是高高在上的道德，而是日常的将心比心。',
    suggestions: ['如何培养"恕"的功夫？', '仁在现代社会怎么实践？', '己所不欲勿施于人够用吗？'],
  },
  laozi: {
    quote: '道常无为而无不为。',
    source: '《道德经·第三十七章》',
    plain: '道永远是不妄为的，却又没有什么事情是它做不到的。',
    interpretation: '你的困惑，多半来自"有为"——太想控制、太想改变、太想得到。老子说，道什么都不强求，却成就了一切。试着放松你紧握的手，不是放弃，而是给事情留出自然生长的空间。很多时候，最好的行动，是暂时不行动。等风来，等水到，等渠成。',
    suggestions: ['无为而无不为怎么理解？', '什么时候该为什么时候不该为？', '如何区分无为和懈怠？'],
  },
  sunzi: {
    quote: '兵无常势，水无常形，能因敌变化而取胜者，谓之神。',
    source: '《孙子兵法·虚实篇》',
    plain: '用兵没有固定的阵势，就像水没有固定的形状，能根据敌人的变化而灵活取胜的，就叫神妙。',
    interpretation: '你想要的，是一个标准答案。但孙子说，世上没有常势常形——就像水，遇到方就方，遇到圆就圆。你的困境不是没有答案，而是你想找一个一劳永逸的答案。真正的智慧，是培养"因变而变"的能力。别再找万能解了，先看清你当下的"地形"和"敌情"，然后因地制宜。',
    suggestions: ['如何培养应变能力？', '没有标准答案怎么决策？', '如何看清当下的"地形"？'],
  },
  wangyangming: {
    quote: '无善无恶心之体，有善有恶意之动。知善知恶是良知，为善去恶是格物。',
    source: '《传习录·钱德洪录》（四句教）',
    plain: '心之本体无善无恶，意念一动便有善有恶。知道什么是善什么是恶就是良知，做善事去恶念就是格物。',
    interpretation: '你的困惑，归根结底是"心"的问题。王阳明四句教，把修心的路径说尽了：心本清净，是念头让它起了波澜；但你本有良知，能分辨善恶；关键在于"为善去恶"——在事上磨炼。不要在脑子里空想答案，去行动，在行动中你的良知自然会告诉你该怎么做。心学不是学问，是功夫。',
    suggestions: ['四句教如何日常运用？', '什么是"事上磨炼"？', '良知如何分辨善恶？'],
  },
}

// ============ 回答匹配逻辑 ============
function matchAnswer(roleId, question) {
  const library = ANSWER_LIBRARY[roleId] || []
  const q = question.toLowerCase()

  let bestMatch = null
  let bestScore = 0

  for (const item of library) {
    let score = 0
    for (const keyword of item.match) {
      if (q.includes(keyword.toLowerCase())) {
        score += 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      bestMatch = item
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch
  }

  // 通用回答兜底
  return GENERIC_ANSWERS[roleId] || GENERIC_ANSWERS.kongzi
}

// ============ 模拟 chat 响应 ============
function buildChatResponse(question, role) {
  const roleInfo = DEFAULT_ROLES.find((r) => r.id === role) || DEFAULT_ROLES[0]
  const answer = matchAnswer(role, question)

  return {
    role: roleInfo.name,
    roleId: roleInfo.id,
    avatar: roleInfo.avatar,
    style: roleInfo.style,
    quote: answer.quote,
    source: answer.source,
    plain: answer.plain,
    interpretation: answer.interpretation,
    suggestions: answer.suggestions,
    rate: roleInfo.rate,
    pitch: roleInfo.pitch,
  }
}

// ============ 网络请求工具 ============
async function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeout)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    return res
  } finally {
    clearTimeout(timer)
  }
}

// ============ 对外 API ============

/**
 * 获取角色列表
 * GET /api/roles
 * 后端返回 { roles: [{ key, name, avatar, style, description, ... }] }
 * 前端需要 [{ id, name, avatar, style, desc, rate, pitch }]
 */
export async function getRoles() {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/roles`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data && data.roles && data.roles.length > 0) {
      // 映射后端字段名到前端字段名
      return data.roles.map((r) => ({
        id: r.key || r.id,
        name: r.name,
        avatar: r.avatar,
        style: r.style,
        desc: r.description || r.desc,
        school: r.school || '',
        era: r.era || '',
        rate: r.rate,
        pitch: r.pitch,
        voiceDesc: r.voice_desc || '',
        voiceNote: r.voice_note || '',
      }))
    }
    return DEFAULT_ROLES
  } catch (err) {
    console.warn('[墨问] 后端不可用，使用默认角色数据:', err.message)
    return DEFAULT_ROLES
  }
}

/**
 * 获取场景库
 * GET /api/scenes
 * 后端返回 { today: {...}, categories: { 职场: [...], 感情: [...]... } }
 * 前端需要 { today: {...}, scenes: [...] } 扁平化数组
 */
export async function getScenes() {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/scenes`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data) {
      // 如果后端返回 categories 格式，转换为扁平数组
      let flatScenes = []
      if (data.categories) {
        const iconMap = { '职场': '卷', '感情': '情', '社交': '社', '成长': '耗', '选择': '择' }
        for (const [cat, sceneList] of Object.entries(data.categories)) {
          if (Array.isArray(sceneList)) {
            sceneList.forEach((scene) => {
              flatScenes.push({
                id: scene.id,
                label: scene.label,
                icon: iconMap[cat] || scene.label?.[0] || '问',
                question: scene.question,
                suggestRole: scene.recommendedRole,
              })
            })
          }
        }
      }
      // 如果后端直接返回 scenes 数组
      if (data.scenes && Array.isArray(data.scenes)) {
        flatScenes = data.scenes
      }
      return {
        today: data.today || DEFAULT_TODAY,
        scenes: flatScenes.length > 0 ? flatScenes : DEFAULT_SCENES,
      }
    }
    return { today: DEFAULT_TODAY, scenes: DEFAULT_SCENES }
  } catch (err) {
    console.warn('[墨问] 后端不可用，使用默认场景数据:', err.message)
    return { today: DEFAULT_TODAY, scenes: DEFAULT_SCENES }
  }
}

/**
 * 发送问题获取回答
 * POST /api/chat  body: { question, role, session_id, user_id }
 * 返回: { role, avatar, style, quote, source, plain, interpretation, suggestions, rate, pitch }
 */
export async function chat(question, role, sessionId = null, userId = null) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          role: role || 'auto',
          session_id: sessionId,
          user_id: userId,
        }),
      },
      10000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data && data.quote) return data
    return buildChatResponse(question, role)
  } catch (err) {
    console.warn('[墨问] 后端不可用，使用本地回答引擎:', err.message)
    // 模拟网络延迟
    await new Promise((r) => setTimeout(r, 600))
    return buildChatResponse(question, role)
  }
}

/**
 * 自动推荐古人角色
 * POST /api/recommend
 * 根据用户提问内容，后端自动匹配最合适的古人
 */
export async function recommendRole(question) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/recommend`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data // { role_key, role_name, avatar }
  } catch (err) {
    console.warn('[墨问] 推荐服务不可用:', err.message)
    return null
  }
}

/**
 * 获取社区最新问答
 * GET /api/community?limit={limit}
 */
export async function getCommunity(limit = 3) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/community?limit=${limit}`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data && data.items) return data.items
    return []
  } catch (err) {
    console.warn('[墨问] 社区服务不可用:', err.message)
    return []
  }
}

/**
 * 保存问答到社区
 * POST /api/community
 */
export async function saveCommunity(item) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/community`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.warn('[墨问] 保存到社区失败:', err.message)
    throw err
  }
}

/**
 * 古籍检索
 * GET /api/search?q={keyword}
 */
export async function searchCorpus(keyword) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/search?q=${encodeURIComponent(keyword)}`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data && data.results) return data.results
    return []
  } catch (err) {
    console.warn('[墨问] 古籍检索不可用:', err.message)
    return []
  }
}

/**
 * 获取云端收藏列表
 * GET /api/favorites?user_id={userId}
 */
export async function getFavorites(userId) {
  try {
    const res = await fetchWithTimeout(`${BASE_URL}/api/favorites?user_id=${userId}`, { method: 'GET' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (data && data.favorites) return data.favorites
    return []
  } catch (err) {
    console.warn('[墨问] 获取云端收藏失败:', err.message)
    return []
  }
}

/**
 * 添加收藏到云端
 * POST /api/favorites
 */
export async function addFavorite(item) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/favorites`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.warn('[墨问] 云端收藏失败:', err.message)
    throw err
  }
}

/**
 * 从云端删除收藏
 * DELETE /api/favorites?user_id={userId}&question={question}&role_id={roleId}
 */
export async function removeFavorite(userId, question, roleId) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/favorites?user_id=${userId}&question=${encodeURIComponent(question)}&role_id=${roleId}`,
      { method: 'DELETE' },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data
  } catch (err) {
    console.warn('[墨问] 删除云端收藏失败:', err.message)
    throw err
  }
}

/**
 * 用户注册
 * POST /api/auth/register
 */
export async function authRegister(username, password, nickname = '') {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, nickname }),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('[墨问] 注册服务不可用:', err.message)
    return { success: false, message: '网络不可用，请确认后端服务正在运行' }
  }
}

/**
 * 用户登录
 * POST /api/auth/login
 */
export async function authLogin(username, password) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('[墨问] 登录服务不可用:', err.message)
    return { success: false, message: '网络不可用，请确认后端服务正在运行' }
  }
}

/**
 * 点赞社区问答
 * POST /api/community/like
 */
export async function likeCommunity(qaId) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/community/like`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qa_id: qaId }),
      },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('[墨问] 点赞服务不可用:', err.message)
    return { success: false, likes: 0, message: '网络不可用' }
  }
}

/**
 * 搜索社区问答
 * GET /api/community/search?keyword=xxx&limit=20
 */
export async function searchCommunity(keyword, limit = 20) {
  try {
    const res = await fetchWithTimeout(
      `${BASE_URL}/api/community/search?keyword=${encodeURIComponent(keyword)}&limit=${limit}`,
      { method: 'GET' },
      5000
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    return data.items || []
  } catch (err) {
    console.warn('[墨问] 搜索社区不可用:', err.message)
    return []
  }
}

export default { getRoles, getScenes, chat, getCommunity, searchCorpus, saveCommunity, getFavorites, addFavorite, removeFavorite, authRegister, authLogin, likeCommunity, searchCommunity }
