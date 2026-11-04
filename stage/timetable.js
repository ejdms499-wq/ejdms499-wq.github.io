// 부산발 런던행 시간표 — 매일 밤 9시(서울 시각) 부산 출발, 92시간 뒤 런던 도착
// h: 출발 후 몇 시간째 시작, tz: 현지 시각(UTC 기준 시차), who: 이 구간 주인공
export const TRIP_H=92;
export const SEG=[
 {id:'busan',  h:0,  name:'부산',            tz:9, sky:'밤',        who:'별주부',              art:true},
 {id:'gyeongbu',h:0.6,name:'경부선 밤길',     tz:9, sky:'밤',        who:'별주부'},
 {id:'seoul',  h:1.5,name:'서울',            tz:9, sky:'밤',        who:'홍길동'},
 {id:'cloud',  h:3,  name:'구름 위 오작교',   tz:9, sky:'한밤→새벽', who:'견우와 직녀'},
 {id:'snow',   h:10, name:'시베리아 설원',    tz:8, sky:'아침→낮',   who:'눈의 여왕'},
 {id:'baikal', h:17, name:'바이칼 호수',      tz:8, sky:'노을',      who:'셜록 탑승'},
 {id:'aurora', h:20, name:'오로라 숲',        tz:7, sky:'밤',        who:'(깜짝) 불새'},
 {id:'taiga',  h:40, name:'타이가 숲',        tz:5, sky:'낮',        who:'(깜짝) 바바 야가'},
 {id:'moscow', h:46, name:'모스크바',         tz:3, sky:'오후→저녁', who:'백조 오데트'},
 {id:'plain',  h:52, name:'동유럽 밤 평원',   tz:2, sky:'밤',        who:'(깜짝) 헨젤과 그레텔'},
 {id:'forest', h:62, name:'독일 숲',          tz:1, sky:'새벽 안개', who:'늑대와 빨간 모자'},
 {id:'castle', h:68, name:'노이슈반슈타인',   tz:1, sky:'아침',      who:'잠자는 숲속의 공주'},
 {id:'alps',   h:72, name:'스위스 알프스',    tz:1, sky:'오후→노을', who:'프랑켄슈타인의 괴물'},
 {id:'paris',  h:78, name:'파리',            tz:1, sky:'저녁→자정', who:'신데렐라'},
 {id:'sea',    h:84, name:'해저터널',         tz:1, sky:'깊은 밤',   who:'인어공주'},
 {id:'england',h:86, name:'영국 시골',        tz:0, sky:'새벽',      who:'흰 토끼'},
 {id:'london', h:91, name:'런던 도착',        tz:0, sky:'아침',      who:'근심 찾기'},
];
const HR=36e5, KST=9;
// 가장 최근에 출발한 열차의 출발 시각 (서울 21:00)
export function lastDeparture(now=Date.now()){
  const k=new Date(now+KST*HR);let d=Date.UTC(k.getUTCFullYear(),k.getUTCMonth(),k.getUTCDate(),21)-KST*HR;
  if(d>now)d-=24*HR;return d;
}
// 출발 시각 dep의 열차가 now에 어디 있는지
export function where(dep,now=Date.now()){
  const h=(now-dep)/HR;
  if(h<0)return {mode:'wait',h,left:-h};
  if(h>=TRIP_H)return {mode:'end',h};
  let i=0;while(i+1<SEG.length&&SEG[i+1].h<=h)i++;
  const s=SEG[i],nx=SEG[i+1],end=nx?nx.h:TRIP_H;
  const local=new Date(now+s.tz*HR);
  return {mode:'run',h,i,seg:s,next:nx,p:(h-s.h)/(end-s.h),day:Math.floor((h+21)/24)+1,
    localH:local.getUTCHours(),localM:local.getUTCMinutes()};
}
