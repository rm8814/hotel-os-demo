window.UPX_APPS = window.UPX_APPS || {};
window.UPX_APPS["mobile"] = function (DCLogic, React) {

class Component extends DCLogic {
  helpTips() { return {frontdesk:[['Check in a guest','Open Arrivals, tap the guest, assign a room if none, then Check in. The room must be clean.'],['Move a guest','Open the guest, tap Room, pick another clean room of the same type.'],['Take a payment','Open the guest, tap Pay, choose the method. Partial payments are fine.'],['Reply to a message','Open Inbox, tap a conversation, type or use the suggested reply.'],['Working offline','Keep going. Changes queue and send when you are back online.']],gm:[['Approve a request','Open Approvals, read the reason and amount, tap Approve or Reject.'],['Read exceptions','Exceptions lists anything off today: oversold nights, unbalanced folios, open tickets.'],['See the numbers','Overview shows occupancy, ADR, RevPAR and revenue for today.'],['Working offline','You can read cached numbers. Approvals wait until you are online.']],housekeeping:[['Clean a room','Open My rooms, tap Start when you enter and Finish when done.'],['Do Not Disturb','Tap DND, set a time to try again. The supervisor sees it.'],['Report a fault','Open Report, pick the room and the issue. A ticket is created.'],['Post minibar','Open the room and tap Minibar, pick the items used.'],['Rush rooms','Rooms marked ARRIVAL come first. Do those before others.']],revenue:[['Check pickup','Overview shows pickup in the last 24 hours and pace against last year.'],['Apply a suggestion','Open Suggestions, read the reason, tap Apply or Skip.'],['Change one rate','Open Rates, tap a night, enter the new rate. Bulk edits are on desktop.'],['Channel issues','Open Channels to see errors. Fix mapping on desktop.']]}; }
  constructor(p) {
    super(p);
    this.state = {theme:(() => { try { return localStorage.getItem('upx_theme') === 'light' ? 'light' : 'dark'; } catch (e) { return 'dark'; } })(),hlp:{},
      tab:{frontdesk:'today',gm:'overview',housekeeping:'mine',revenue:'rates',finance:'cash',owner:'snapshot',guest:'stay'},
      deps:[{id:'d1',g:'Sarah Whitfield · 102',amt:1500000,m:'Card hold',st:'Held',out:'Tomorrow'},{id:'d2',g:'Hans Becker · 202',amt:1000000,m:'Cash',st:'Held',out:'Today'},{id:'d3',g:'Elena Petrova · 301',amt:2000000,m:'QRIS',st:'Held',out:'Sun'},{id:'d4',g:'Ayumi Sato · V2',amt:3000000,m:'Card hold',st:'Settled · Rp 250,000 deducted',out:'Yesterday'}], svcSt:'draft', restr:{'Fri 11 Sep':{so:false,cta:true,min:2},'Sat 12 Sep':{so:false,cta:false,min:2},'Sun 13 Sep':{so:true,cta:false,min:1}},
      openArr:null, toasts:{}, hkFilter:'All', aiApplied:{}, acked:{}, appr:{}, reports:[], issueRoom:'104', issueType:'Plumbing',
      hk:{'101':'Vacant Clean','102':'Occupied','103':'Occupied','104':'Vacant Dirty','105':'Inspected','201':'Vacant Clean','202':'Occupied','203':'Vacant Dirty','204':'Occupied','301':'Occupied','302':'Vacant Dirty','303':'OOO','V1':'Inspected','V2':'Occupied'},
      arr:[
        {id:'a1',guest:'Wirawan Hadi',room:'101',type:'Deluxe King',ch:'Direct',eta:'13:30',pre:false,paid:false,checked:false,steps:{}},
        {id:'a2',guest:'Dewi Lestari',room:'201',type:'Deluxe Twin',ch:'Traveloka',eta:'14:00',pre:false,paid:false,checked:false,steps:{}},
        {id:'a3',guest:'James Okafor',room:'302',type:'Suite',ch:'Agoda',eta:'15:30',pre:false,paid:false,checked:false,steps:{}},
        {id:'a4',guest:'Budi Santoso',room:null,type:'Deluxe Twin',ch:'Direct',eta:'16:00',pre:false,paid:false,checked:false,steps:{}}],
      cash:[{id:'p1',g:'Hans Becker · 202',bal:0},{id:'p2',g:'Sarah Whitfield · 102',bal:3200000,due:true},{id:'p3',g:'Tanaka Kenji · 103',bal:1150000,due:true},{id:'p4',g:'Elena Petrova · 301',bal:8400000,due:true}],
      cashIn:5550000, remind:{}, auditDone:false, auditOverride:false, chanFixed:false, loading:{}, offline:false, queued:{}, syncError:false, push:{}, unlocked:false, guest:{steps:{},done:false,booked:null,bk:{in:3,n:2,type:'Deluxe King'}}
    };
    this.ROLES = [
      {id:'frontdesk',oid:'1a',name:'Front desk',who:'Ketut Arya',ini:'KA',tabs:[['today','Today','layout-dashboard'],['arrivals','Arrivals','log-in'],['rooms','Rooms','bed-double'],['inbox','Inbox','message-square']]},
      {id:'gm',oid:'1b',name:'General manager',who:'Maya Sutrisno',ini:'MS',tabs:[['overview','Overview','layout-dashboard'],['exceptions','Exceptions','alert-triangle'],['approvals','Approvals','shield-check']]},
      {id:'housekeeping',oid:'1c',name:'Housekeeping',who:'Wayan Sari',ini:'WS',tabs:[['mine','My rooms','sparkles'],['board','Board','layout-grid'],['issues','Report','wrench']]},
      {id:'revenue',oid:'1d',name:'Revenue manager',who:'Daniel Hartono',ini:'DH',tabs:[['rates','Rates','bar-chart-3'],['pace','Pace','trending-up'],['restr','Restrict','ban'],['channels','Channels','globe']]},
      {id:'finance',oid:'1e',name:'Finance',who:'Rina Kusuma',ini:'RK',tabs:[['cash','Cash','banknote'],['deps','Deposits','shield'],['svc','Svc charge','hand-coins'],['audit','Audit','moon-star']]},
      {id:'owner',oid:'1f',name:'Owner',who:'Pak Budiman',ini:'PB',tabs:[['snapshot','Snapshot','layout-dashboard'],['revenue','Revenue','bar-chart-3'],['digest','Digest','file-text']]}];
    this.TYPES = {'Deluxe King':['101','102','103','104','105'],'Deluxe Twin':['201','202','203','204'],'Suite':['301','302','303'],'Pool Villa':['V1','V2']};
    this.HKC = {'Vacant Dirty':'var(--room-vacant-dirty)','Vacant Clean':'var(--room-vacant-clean)','Inspected':'var(--room-inspected)','Occupied':'var(--room-occupied)','OOO':'var(--room-ooo)'};
    this.HKW = {'Vacant Dirty':'var(--room-vacant-dirty-w)','Vacant Clean':'var(--room-vacant-clean-w)','Inspected':'var(--room-inspected-w)','Occupied':'var(--room-occupied-w)','OOO':'var(--room-ooo-w)'};
    this.OUTLOOK = [64,71,79,86,93,93,79,64,57,71,79,86,71,64];
    this.DOW = ['T','W','T','F','S','S','M','T','W','T','F','S','S','M'];
  }
  idr(n) { return 'Rp ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  componentDidMount() { this._hkTick = setInterval(() => { const tm = this.state.hkTm || {}; if (Object.values(tm).some(t => t.run)) this.forceUpdate(); },1000); this._pt = setTimeout(() => this.sendPush(['frontdesk']), 6000); }
  componentWillUnmount() { clearTimeout(this._pt); }
  toast(role, text) { const off = this.state.offline; this.setState(s => ({toasts:{...s.toasts,[role]:off ? 'Offline. Queued: ' + text : text},queued:off ? {...s.queued,[role]:(s.queued[role] || 0) + 1} : s.queued})); setTimeout(() => this.setState(s => ({toasts:{...s.toasts,[role]:null}})), 2600); }
  setTab(role, t) { this.setState(s => ({tab:{...s.tab,[role]:t},loading:{...s.loading,[role]:true}})); setTimeout(() => this.setState(s => ({loading:{...s.loading,[role]:false}})), 380); }
  empty(icon, title, text) { return this.blk('Empty',{icon,title,text}); }
  PUSH() { return {frontdesk:{text:'Wirawan Hadi is 10 minutes away. Room 101 is ready.',tab:'arrivals'},gm:{text:'Fri 11 Sep reached 93% with 1 room left.',tab:'exceptions'},housekeeping:{text:'Room 302 is needed by 15:30. Arrival priority.',tab:'mine'},revenue:{text:'Expedia sync is degraded. 1 rate below parity.',tab:'channels'},finance:{text:'Kemenparekraf is over its credit limit.',tab:'ar'},owner:{text:'Your weekly digest is ready.',tab:'digest'},guest:{text:'Your room is ready. Tap to open your digital key.',tab:'key'}}; }
  sendPush(roles) { const P = this.PUSH(), set = {}; (roles || Object.keys(P)).forEach(r => { set[r] = P[r]; }); this.setState(s => ({push:{...s.push,...set}})); setTimeout(() => this.setState(s => { const n = {...s.push}; Object.keys(set).forEach(r => { if (n[r] === set[r]) delete n[r]; }); return {push:n}; }), 7000); }
  roomFor(a) {
    const s = this.state; if (a.room) return a.room;
    const taken = s.arr.map(x => x.room).filter(Boolean);
    return this.TYPES[a.type].find(r => s.hk[r] !== 'Occupied' && s.hk[r] !== 'OOO' && !taken.includes(r));
  }
  stepState(a) { const o = a.steps || {}; return {id:a.pre || !!o.id, room:!!a.room || !!o.room, pay:a.paid || a.pre || !!o.pay, dep:!!o.dep}; }
  blk(kind, d) { return {isEmpty:false,isSkel:false,isHero:false,isKpis:false,isAlert:false,isList:false,isBars:false,isHbars:false,isChips:false,isGrid:false,isChecklist:false,isNote:false,['is' + kind]:true,...d}; }
  hero(eyebrow, value, note, color) { return this.blk('Hero',{eyebrow,value,note,vstyle:'font-family:var(--font-display);font-weight:700;font-size:34px;letter-spacing:-0.02em;color:' + (color || 'var(--fg-1)')}); }
  kpis(items) { return this.blk('Kpis',{items:items.map(i => ({label:i[0],value:i[1],note:i[2] || '',style:'font-family:var(--font-mono);font-size:' + (String(i[1]).length > 9 ? 15 : 19) + 'px;font-weight:600;white-space:nowrap;color:' + (i[3] || 'var(--fg-1)')}))}); }
  alert(tone, title, text, btn, run, btnVariant) {
    const C = {ai:['var(--ai-tint)','var(--ai-edge)','var(--ai-fg)'],warn:['var(--bg-elevated)','rgba(255,178,63,.5)','var(--warning)'],bad:['var(--bg-elevated)','rgba(255,90,122,.5)','var(--room-ooo)'],live:['var(--bg-elevated)','rgba(0,212,255,.4)','var(--accent-cyan)']}[tone];
    return this.blk('Alert',{title,text,btn,run,hasBtn:!!btn,btnVariant:btnVariant || 'secondary',style:'background:' + C[0] + ';border:1px solid ' + C[1] + ';border-radius:var(--r-lg);padding:14px;display:flex;flex-direction:column;gap:8px',titleStyle:'font-size:11.5px;letter-spacing:.06em;text-transform:uppercase;font-weight:600;color:' + C[2]});
  }
  row(title, sub, o = {}) { return {title,sub,right:o.right || '',hasRight:!!o.right,rstyle:'font-family:var(--font-mono);font-size:13px;font-weight:600;' + (o.rcolor ? 'color:' + o.rcolor : ''),pill:o.pill || '',hasPill:!!o.pill,tone:o.tone || 'neutral',btns:o.btns || [],hasBtn:!!(o.btns && o.btns.length),open:!!o.steps,steps:o.steps || [],cta:o.cta || {label:'',off:true,run:() => {}}}; }
  btn(label, run, variant, icon, disabled) { return {label,run,variant:variant || 'primary',icon:icon || '',disabled:!!disabled}; }
  list(title, rows) { return this.blk('List',{title,rows}); }
  bars(title, vals, labels, h, hi) { const mx = Math.max(...vals); return this.blk('Bars',{title,h:h || 130,bars:vals.map((v,i) => ({val:v,label:labels[i] || '',style:'width:100%;border-radius:3px 3px 0 0;height:' + Math.max(6,Math.round(78 * v / mx)) + 'px;background:' + (i === 0 ? 'var(--accent-cyan)' : v >= 85 ? 'var(--accent-violet)' : v >= 70 ? 'var(--accent-violet-hi)' : 'rgba(238,244,255,.16)')}))}); }
  hbars(title, rows, col) { return this.blk('Hbars',{title,bars:rows.map(r => ({label:r[0],val:r[2],style:'display:block;height:100%;width:' + r[1] + '%;background:' + (col || 'var(--accent-violet)')}))}); }
  chips(items) { return this.blk('Chips',{items}); }
  chipStyle(on) { return 'flex:none;border:1px solid ' + (on ? 'var(--accent-violet)' : 'var(--line)') + ';border-radius:999px;padding:7px 14px;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;color:' + (on ? 'var(--fg-1)' : 'var(--fg-2)') + ';background:' + (on ? 'var(--accent-violet)' : 'transparent'); }
  dot(done) { return 'width:22px;height:22px;flex:none;border-radius:999px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px;' + (done ? 'background:var(--accent-cyan);color:#061020' : 'border:1px solid var(--line-strong);color:var(--fg-3)'); }
  checkItem(label, note, done, i) { return {label,note,done,mark:done ? '✓' : String(i),dot:this.dot(done)}; }

  screen(role, tab) {
    const s = this.state, self = this, idr = n => this.idr(n);
    const dirty = Object.keys(s.hk).filter(r => s.hk[r] === 'Vacant Dirty'), left = s.arr.filter(a => !a.checked && !a.noShow);
    let B = [];
    if (s.loading[role]) return [this.blk('Skel',{h:96}),this.blk('Skel',{h:150}),this.blk('Skel',{h:72}),this.blk('Skel',{h:110})];
    if (s.syncError && role !== 'guest') B.push(this.alert('bad','Sync failed','Could not reach the server. Showing data from 09:32.','Retry',() => { self.setState({syncError:false}); self.toast(role,'Reconnected. Data refreshed.'); },'secondary'));
    if (role === 'frontdesk') {
      if (tab === 'today') {
        B.push(this.hero('Arrivals left',String(left.length),left.length ? 'Next: ' + left[0].guest + ' · ' + left[0].eta : 'All arrivals checked in','var(--accent-cyan)'));
        B.push(this.kpis([['In-house',String(5 + s.arr.filter(a => a.checked).length),'guests'],['Departures','1','Rahmat H. · 204'],['Unassigned',String(s.arr.filter(a => !a.room && !a.checked).length),'sold, no room'],['Occupancy','64%','tonight']]));
        B.push(this.alert('live','Live · occupancy','Fri 11 Sep is at 93% with 1 room left. Hold walk-ins for that night.','Tell revenue manager',() => self.toast('frontdesk','Sent to Daniel Hartono')));
        B.push(this.list('Next arrivals',left.slice(0,2).map(a => this.row(a.guest,a.type + ' · ' + a.ch,{right:a.eta,btns:[this.btn('Check in',() => { self.setState({openArr:a.id}); self.setTab('frontdesk','arrivals'); },a.pre ? 'primary' : 'secondary','log-in')]}))));
      } else if (tab === 'inbox') {
        const INB = s.inbox || [{id:'c1',guest:'Sarah Whitfield',room:'101',chan:'WhatsApp',last:'Thank you. And the cot?',t:'11:48',unread:true,ai:'A baby cot is ready for you at no charge. We will message you as soon as your room is ready.'},{id:'c4',guest:'Budi Santoso',room:'Arriving',chan:'WhatsApp',last:'Pagi, apakah bisa early check-in jam 11?',t:'07:12',unread:true,ai:'Pagi Pak Budi. Early check-in pukul 11:00 bisa kami usahakan; kami kabari begitu kamar siap.'},{id:'c2',guest:'Hans Becker',room:'Suite 401',chan:'Email',last:'Please send the invoice to Bank Mandiri…',t:'08:05',unread:false,ai:''}];
        const un = INB.filter(c => c.unread).length, oldest = INB.filter(c => c.unread).slice(-1)[0];
        B.push(this.hero('Waiting for a reply',String(un),un ? 'Oldest: ' + oldest.guest + ' · ' + oldest.t : 'All caught up','var(--accent-violet-hi)'));
        B.push(this.list('Conversations',INB.map(c => { const o = s.inbOpen === c.id; const r = this.row(c.guest,c.last,{right:c.t,pill:c.unread ? 'Unread' : c.chan,tone:c.unread ? 'brand' : 'neutral',btns:[this.btn(o ? 'Hide' : 'Open',() => self.setState(x => ({inbOpen:x.inbOpen === c.id ? null : c.id})),'ghost')]}); r.hasBtn = true;
          const upd = (last) => self.setState(x => ({inbox:(x.inbox || INB).map(y => y.id === c.id ? {...y,unread:false,last,t:'now'} : y),inbOpen:null}));
          if (o) { r.open = true; r.steps = [{...this.checkItem(c.room + ' · ' + c.chan,c.last,true,1),btn:'',run:null},...(c.ai ? [{...this.checkItem('AI suggestion',c.ai,false,2),btn:'Send',run:() => { upd(c.ai); self.toast(role,'Sent by ' + c.chan); }}] : [])]; r.cta = {label:'Quick reply: Early check-in',off:false,run:() => { upd('Rooms are usually ready from 13:00. We will message you the moment yours is.'); self.toast(role,'Quick reply sent'); }}; }
          return r; })));
        B.push(this.blk('Note',{text:'Full thread, templates and attachments are on desktop. Replies here go out on the guest\'s preferred channel.'}));
      } else if (tab === 'arrivals') {
        B.push(this.list('Arrivals today · ' + left.length + ' left',s.arr.map(a => {
          const st = this.stepState(a), rm = this.roomFor(a), ready = rm && (s.hk[rm] === 'Vacant Clean' || s.hk[rm] === 'Inspected' || a.checked), open = s.openArr === a.id && !a.checked, all = st.id && st.room && st.pay && !!st.dep;
          const row = this.row(a.guest,(rm ? 'Room ' + rm : 'No room') + ' · ' + a.type + ' · ' + a.eta,{pill:a.noShow ? 'No-show' : a.checked ? 'In-house' : a.pre ? 'Pre-checked' : ready ? 'Room ready' : 'Room not ready',tone:a.checked ? 'positive' : a.pre || ready ? 'brand' : 'warning'});
          if (!a.checked && !a.noShow) row.btns = [this.btn(open ? 'Close' : 'Check in',() => self.setState(x => ({openArr:x.openArr === a.id ? null : a.id})),open ? 'ghost' : (a.pre ? 'primary' : 'secondary'),open ? 'x' : 'log-in')];
          row.hasBtn = row.btns.length > 0;
          if (open) {
            const setStep = k => () => self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,steps:{...y.steps,[k]:true}} : y)}));
            row.open = true;
            row.steps = [
              {...this.checkItem('Verify ID',st.id ? (a.pre ? 'Passport scanned online' : 'Passport scanned') : 'Scan passport or KTP',st.id,1),btn:st.id ? 'Verified' : 'Scan ID',run:setStep('id')},
              {...this.checkItem('Assign room',a.room ? 'Room ' + a.room + (ready ? ' · ready' : ' · still being cleaned') : rm ? 'Suggested ' + rm + (ready ? ' · ready' : ' · being cleaned') : 'No room free',!!a.room,2),btn:a.room ? 'Assigned' : rm ? 'Assign ' + rm : 'None',run:() => { if (rm) self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,room:rm} : y)})); }},
              {...this.checkItem('Payment',st.pay ? (a.pre ? 'Card on file' : 'Prepayment taken') : 'Prepayment ' + idr(1550000),st.pay,3),btn:st.pay ? 'Done' : 'Take payment',run:setStep('pay')},
              {...this.checkItem('Security deposit',st.dep ? idr(500000) + ' held · cash' : 'Refundable ' + idr(500000) + ' per room',!!st.dep,4),btn:st.dep ? 'Taken' : 'Take deposit',run:() => { if (!st.dep) { setStep('dep')(); self.toast('frontdesk','Security deposit ' + idr(500000) + ' taken · cash'); } }}];
            const fin = a.room || rm;
            const rdy = fin && (s.hk[fin] === 'Vacant Clean' || s.hk[fin] === 'Inspected');
            row.cta = {label:all ? (rdy ? 'Check in and encode key' : 'Room ' + fin + ' not ready') : 'Complete steps to check in',off:!(all && rdy),run:() => { self.setState(x => ({arr:x.arr.map(y => y.id === a.id ? {...y,checked:true,room:fin} : y),hk:{...x.hk,[fin]:'Occupied'},openArr:null})); self.toast('frontdesk',a.guest + ' checked in · room ' + fin + ' · key encoded'); }};
          }
          return row; })));
        B.push(this.list('In-house folios',s.cash.map(c => { const o = s.folOpen === c.id; const r = this.row(c.g,c.due ? 'Balance due · open folio' : 'Settled · open folio',{right:c.due ? idr(c.bal) : 'Rp 0',pill:c.due ? 'Due' : 'Settled',tone:c.due ? 'warning' : 'positive',btns:[this.btn(o ? 'Hide' : 'Summary',() => self.setState(x => ({folOpen:x.folOpen === c.id ? null : c.id})),'ghost')]}); r.hasBtn = true;
          if (o) { r.open = true; const net = Math.round(c.bal / 1.21); r.steps = [{...this.checkItem('Room nights',c.due ? idr(Math.round(net * 0.94)) + ' net · posts nightly at audit' : 'Prepaid · card on file',true,1),btn:c.due ? 'Posted' : 'Prepaid',run:() => {}},{...this.checkItem('Extras',c.due ? idr(Math.round(net * 0.06)) + ' net · minibar, laundry' : 'None posted',true,2),btn:c.due ? 'Posted' : 'None',run:() => {}},{...this.checkItem('PB1 10% + service 11%',c.due ? idr(c.bal - net) : 'Included in prepayment',true,3),btn:'Auto',run:() => {}}]; r.cta = {label:'Post charges and invoice on desktop',off:true,run:() => {}}; }
          return r; })));
        B.push(this.blk('Note',{text:'A guest cannot be checked in until housekeeping has cleaned the room. Clean 302 or 203 on the housekeeping phone.'}));
      } else {
        const F = ['All','Vacant Dirty','Vacant Clean','Inspected','Occupied','OOO'];
        B.push(this.chips(F.map(f => ({label:f === 'All' ? 'All' : f.replace('Vacant ','').replace('OOO','Out of order'),pick:() => self.setState({hkFilter:f}),style:this.chipStyle(s.hkFilter === f)}))));
        B.push(this.grid(s.hkFilter,false,role));
      }
    } else if (role === 'gm') {
      if (tab === 'overview') {
        B.push(this.hero('Tonight','64% occupied','9 of 14 rooms · peak 93% on Fri 11 Sep','var(--accent-cyan)'));
        B.push(this.kpis([['Revenue today','Rp 19,670,000','+4.2% vs prior'],['ADR','Rp 2,185,556','+1.8%'],['RevPAR','Rp 1,405,000','+3.0%'],['Guest score','4.8','1,204 reviews']]));
        const ap = s.aiApplied.king;
        B.push(this.alert('ai','AI suggestion',ap ? 'Applied. Deluxe King +12% for Fri and Sat is live on 5 channels.' : 'Deluxe King up 12% for Fri and Sat. Demand from 4 OTAs.',ap ? '' : 'Approve rate change',() => { self.setState(x => ({aiApplied:{...x.aiApplied,king:true}})); self.toast('gm','Rate change approved'); },'primary'));
        B.push(this.bars('Occupancy · next 14 days',this.OUTLOOK,this.DOW,140));
      } else if (tab === 'exceptions') {
        const items = [
          ['audit','Night audit due 02:00','Business date is current. ' + left.length + ' arrival' + (left.length === 1 ? '' : 's') + ' not yet checked in.','warn','Front desk'],
          ['ooo','Room 303 out of order','AC compressor. Ticket #482, overdue.','bad','Maintenance'],
          ['dirty',dirty.length + ' rooms still dirty','Cut-off for 14:00 check-in. 302 is an arrival.','warn','Housekeeping'],
          ['ar','Kemenparekraf over credit limit','Balance exceeds limit by Rp 2,500,000.','bad','Finance']];
        B.push(this.list('Open exceptions · ' + items.filter(i => !s.acked[i[0]]).length,items.map(i => this.row(i[1],i[2],{pill:s.acked[i[0]] ? 'Assigned' : 'Open',tone:s.acked[i[0]] ? 'positive' : i[3] === 'bad' ? 'negative' : 'warning',btns:s.acked[i[0]] ? [] : [this.btn('Notify ' + i[4],() => { self.setState(x => ({acked:{...x.acked,[i[0]]:true}})); self.toast('gm',i[4] + ' notified'); },'secondary','send')]}))));
      } else {
        const A = [['void','Void posting · Rp 108,900','Hans Becker · Suite 401 · Minibar duplicate','Requested by Dewi L.'],['refund','Refund Rp 500,000 deposit','Chloe Martin · 201 · cash','Requested by Amira K.'],['up','Complimentary upgrade','Sarah Whitfield · Deluxe King → Suite 301','Platinum guest'],['rate','Rate override −5%','Bank Mandiri · 3 nights · Deluxe King','Requested by Ketut'],['ref','Refund Rp 750,000','Tom Reeves · early departure','Requested by Ketut']];
        if (s.pinFor) B.push(this.blk('Pin',{label:'PIN for ' + (A.find(a => a[0] === s.pinFor) || [])[1],value:s.pin || '',onInput:e => self.setState({pin:e.target.value.replace(/\D/g,'').slice(0,4)}),cancel:() => self.setState({pinFor:null,pin:''})}));
        B.push(this.list('Pending approvals · ' + A.filter(a => !s.appr[a[0]]).length,A.map(a => this.row(a[1],a[2],{right:'',pill:s.appr[a[0]] ? (s.appr[a[0]] === 'ok' ? 'Approved' : 'Declined') : a[3],tone:s.appr[a[0]] === 'ok' ? 'positive' : s.appr[a[0]] ? 'negative' : 'neutral',btns:s.appr[a[0]] ? [] : [this.btn(s.pinFor === a[0] ? 'Confirm PIN' : 'Approve',() => { const sens = a[0] === 'void' || a[0] === 'refund'; if (sens && s.pinFor !== a[0]) { self.setState({pinFor:a[0],pin:''}); self.toast('gm','Enter your 4-digit PIN to approve a ' + (a[0] === 'void' ? 'void' : 'refund')); return; } if (sens && (s.pin || '').length !== 4) { self.toast('gm','PIN must be 4 digits'); return; } self.setState(x => ({appr:{...x.appr,[a[0]]:'ok'},pinFor:null,pin:''})); self.toast('gm',a[1] + ' approved' + (sens ? ' · PIN verified · logged' : '')); },'primary','check'),this.btn('Decline',() => { self.setState(x => ({appr:{...x.appr,[a[0]]:'no'}})); self.toast('gm','Declined'); },'ghost','x')]}))));
      }
    } else if (role === 'housekeeping') {
      if (tab === 'mine') {
        B.push(this.hero('Rooms to clean',String(dirty.length),dirty.length ? 'Before 14:00 · priority first' : 'All clean. Ask for inspection.','var(--warning)'));
        const arrRooms = s.arr.filter(a => !a.checked && a.room).map(a => a.room);
        const tm = s.hkTm || {}, dnd = s.hkDnd || {}, rush = s.hkRush || {};
        const seq = [...dirty].sort((a,b) => ((rush[b] ? 2 : 0) + (arrRooms.includes(b) ? 1 : 0)) - ((rush[a] ? 2 : 0) + (arrRooms.includes(a) ? 1 : 0)));
        const fmt = ms => { const m = Math.floor(ms / 60000), sx = Math.floor((ms % 60000) / 1000); return String(m).padStart(2,'0') + ':' + String(sx).padStart(2,'0'); };
        B.push(this.list('Your sheet · ' + seq.length + ' rooms',seq.map((r,i) => { const t = tm[r] || {el:0,run:false}, el = t.el + (t.run ? Date.now() - t.since : 0), isDnd = !!dnd[r];
          const sub = (rush[r] ? 'Rush · ' : arrRooms.includes(r) ? 'Arrival today · ' : '') + (i === 0 ? 'Departure clean · 1.5 cr' : 'Stayover · 1 cr') + ' · ' + Object.keys(this.TYPES).find(ty => this.TYPES[ty].includes(r)) + (isDnd ? ' · DND, retry ' + dnd[r] : t.run ? ' · ' + fmt(el) : el ? ' · paused ' + fmt(el) : '');
          const btns = isDnd ? [this.btn('Retry now',() => { self.setState(x => { const d = {...x.hkDnd}; delete d[r]; return {hkDnd:d}; }); },'ghost','bell')] : t.run ? [this.btn('Pause',() => self.setState(x => ({hkTm:{...x.hkTm,[r]:{...t,run:false,el:el}}})),'ghost','pause'),this.btn('Finish',() => { self.setState(x => ({hkTm:{...x.hkTm,[r]:{el,run:false,done:true,min:Math.max(1,Math.round(el / 60000))}},hk:{...x.hk,[r]:'Vacant Clean'}})); self.toast('housekeeping','Room ' + r + ' done · ' + fmt(el) + ' · sent for inspection'); },'primary','check')] : [this.btn(el ? 'Resume' : 'Start',() => { self.setState(x => ({hkTm:{...x.hkTm,[r]:{...t,run:true,since:Date.now()}}})); self.toast('housekeeping','Timer started · ' + r); },'primary','play'),this.btn('DND',() => { self.setState(x => ({hkDnd:{...x.hkDnd,[r]:'13:30'}})); self.toast('housekeeping','Room ' + r + ' skipped · retry 13:30'); },'ghost','bell-off')];
          return this.row((i + 1) + ' · Room ' + r,sub,{pill:rush[r] ? 'Rush' : arrRooms.includes(r) ? 'Priority' : t.run ? 'Cleaning' : '',tone:rush[r] ? 'negative' : t.run ? 'brand' : 'warning',btns}); })));
        if (!dirty.length) B.push(this.blk('Note',{text:'Nothing assigned. Clean rooms wait for the supervisor inspection.'}));
      } else if (tab === 'board') {
        B.push(this.grid('All',true,role));
        B.push(this.blk('Note',{text:'Tap a room to move it to the next status. Dirty → Clean → Inspected.'}));
      } else {
        const rooms = ['101','104','203','302','303'], types = ['Plumbing','Electrical','AC','Furniture'];
        B.push(this.chips(rooms.map(r => ({label:'Room ' + r,pick:() => self.setState({issueRoom:r}),style:this.chipStyle(s.issueRoom === r)}))));
        B.push(this.chips(types.map(t => ({label:t,pick:() => self.setState({issueType:t}),style:this.chipStyle(s.issueType === t)}))));
        B.push(this.alert('ai','New ticket','Room ' + s.issueRoom + ' · ' + s.issueType + '. Maintenance (Budi) is notified and the room stays sellable unless blocked.','Submit report',() => { self.setState(x => ({reports:[{r:x.issueRoom,t:x.issueType},...x.reports]})); self.toast('housekeeping','Reported · ' + s.issueType + ' · room ' + s.issueRoom); },'primary'));
        if (s.reports.length) B.push(this.list('Reported today',s.reports.map(x => this.row('Room ' + x.r,x.t,{pill:'Sent',tone:'positive'}))));
      }
    } else if (role === 'revenue') {
      if (tab === 'rates') {
        const AI = [['king','Deluxe King · Fri, Sat','+12%','Forecast 93%. 4 OTAs searching, pace +18% vs last week.'],['suite','Suite · Fri, Sat','+8%','Two suites left. Comp set averages 9% above.'],['twin','Deluxe Twin · Tue, Wed','−6%','Two twins unsold tonight. Comp set averages 9% below.']];
        B.push(this.hero('AI suggestions',String(AI.filter(a => !s.aiApplied[a[0]]).length),'waiting for your decision','var(--ai-fg)'));
        AI.forEach(a => B.push(this.alert('ai',a[1] + ' · ' + a[2],a[3] + (s.aiApplied[a[0]] ? ' Applied.' : ''),s.aiApplied[a[0]] ? '' : 'Apply',() => { self.setState(x => ({aiApplied:{...x.aiApplied,[a[0]]:true}})); self.toast('revenue',a[1] + ' ' + a[2] + ' applied'); },'primary')));
        B.push(this.list('Rates tonight',[['Deluxe King',1450000,s.aiApplied.king ? 1624000 : 1450000],['Deluxe Twin',1550000,1550000],['Suite',2900000,2900000],['Pool Villa',4800000,4800000]].map(r => this.row(r[0],'Best available',{right:idr(r[1]),rcolor:r[1] !== r[2] ? 'var(--ai-fg)' : ''}))));
      } else if (tab === 'pace') {
        B.push(this.kpis([['Pickup · 24h','+9','room-nights','var(--accent-cyan)'],['Weekend pace','+18%','vs last week','var(--accent-cyan)'],['OTB revenue','Rp 168 jt','next 14 nights'],['Group pickup','2 of 6','Mandiri retreat']]));
        B.push(this.bars('On the books · occupancy %',this.OUTLOOK,this.DOW,140));
        B.push(this.alert('warn','Group cut-off','Bali Yoga Collective has 5 rooms held and an unsigned contract. Cut-off in 6 days.'));
      } else if (tab === 'restr') {
        const days = Object.keys(s.restr);
        B.push(this.hero('Restrictions · next weekend',String(days.filter(d => s.restr[d].so || s.restr[d].cta || s.restr[d].min > 1).length) + ' active','All room types · all channels · changes push to Channex','var(--fg-1)'));
        B.push(this.list('By night',days.map(d => { const r = s.restr[d], tog = (k,v) => () => { self.setState(x => ({restr:{...x.restr,[d]:{...x.restr[d],[k]:v}}})); self.toast('revenue',d + ' · ' + (k === 'so' ? (v ? 'stop-sell on' : 'stop-sell off') : k === 'cta' ? (v ? 'closed to arrival' : 'open to arrival') : 'min stay ' + v + 'n') + ' · pushed to 8 channels'); };
          return this.row(d,[r.so ? 'Stop-sell' : null,r.cta ? 'CTA' : null,r.min > 1 ? 'Min ' + r.min + 'n' : null].filter(Boolean).join(' · ') || 'Open, no restrictions',{right:r.so ? 'Closed' : 'Open',rcolor:r.so ? 'var(--room-ooo)' : 'var(--accent-cyan)',btns:[this.btn(r.so ? 'Open sales' : 'Stop-sell',tog('so',!r.so),r.so ? 'secondary' : 'destructive'),this.btn(r.cta ? 'Allow arrival' : 'Close to arrival',tog('cta',!r.cta),'secondary'),this.btn('Min ' + (r.min >= 3 ? 1 : r.min + 1) + 'n',tog('min',r.min >= 3 ? 1 : r.min + 1),'ghost')]}); })));
        B.push(this.blk('Note',{text:'Per-channel and per-plan overrides are desktop only. Everything here applies to the base scope.'}));
      } else {
        const C = [['Booking.com','Connected','In parity','2 min ago'],['Agoda','Connected','In parity','4 min ago'],['Expedia',s.chanFixed ? 'Connected' : 'Degraded',s.chanFixed ? 'In parity' : '1 rate below',s.chanFixed ? 'just now' : '38 min ago'],['Traveloka','Connected','In parity','7 min ago'],['Airbnb','Disconnected','—','3 days ago']];
        B.push(this.list('Channel health',C.map(c => this.row(c[0],c[2] + ' · synced ' + c[3],{pill:c[1],tone:c[1] === 'Connected' ? 'positive' : c[1] === 'Degraded' ? 'warning' : 'negative',btns:c[0] === 'Expedia' && !s.chanFixed ? [this.btn('Fix mapping',() => { self.setState({chanFixed:true}); self.toast('revenue','Expedia mapping fixed. Rates pushed.'); },'primary','wrench')] : c[1] === 'Disconnected' ? [this.btn('Reconnect',() => self.toast('revenue','Re-authentication link sent'),'destructive')] : []}))));
      }
    } else if (role === 'finance') {
      if (tab === 'cash') {
        B.push(this.hero('Expected in drawer',idr(2000000 + s.cashIn),'Opening float Rp 2,000,000 · Amira K.','var(--fg-1)'));
        B.push(this.kpis([['Shift','Open','since 07:02','var(--accent-cyan)'],['Cash collected',idr(s.cashIn),'today']]));
        B.push(this.list('Open folios',s.cash.filter(c => c.due).map(c => this.row(c.g,'Balance due',{right:idr(c.bal),btns:[this.btn('Record cash',() => { self.setState(x => ({cashIn:x.cashIn + c.bal,cash:x.cash.map(y => y.id === c.id ? {...y,due:false} : y)})); self.toast('finance',idr(c.bal) + ' recorded · ' + c.g); },'primary','banknote')]}))));
        if (!s.cash.some(c => c.due)) B.push(this.blk('Note',{text:'No open folios. Quiet evening.'}));
      } else if (tab === 'deps') {
        const held = s.deps.filter(d => d.st === 'Held');
        B.push(this.hero('Deposits held',idr(held.reduce((a,d) => a + d.amt,0)),held.length + ' stays · settle at check-out','var(--fg-1)'));
        B.push(this.kpis([['Due back today',String(held.filter(d => d.out === 'Today').length),'check-outs'],['Settled this week','4','Rp 450,000 deducted']]));
        B.push(this.list('Held',held.map(d => this.row(d.g,d.m + ' · returns ' + d.out,{right:idr(d.amt),btns:[this.btn('Settle in full',() => { self.setState(x => ({deps:x.deps.map(y => y.id === d.id ? {...y,st:'Settled · nothing deducted'} : y)})); self.toast('finance',idr(d.amt) + ' returned · ' + d.g.split(' ·')[0]); },'primary','check'),this.btn('Deduct…',() => { self.setState(x => ({deps:x.deps.map(y => y.id === d.id ? {...y,st:'Settled · Rp 150,000 deducted'} : y)})); self.toast('finance','Rp 150,000 deducted · minibar · receipt sent'); },'secondary')]}))));
        B.push(this.list('Settled',s.deps.filter(d => d.st !== 'Held').map(d => this.row(d.g,d.st,{right:idr(d.amt),rcolor:'var(--fg-3)'}))));
      } else if (tab === 'svc') {
        const approved = s.svcSt === 'approved';
        B.push(this.hero('Service charge · Sep',idr(21400000),'Collected to date · 10% on room and F&B','var(--fg-1)'));
        B.push(this.kpis([['Per point',idr(285000),'46 points this month'],['Status',approved ? 'Approved' : 'Draft','by GM',approved ? 'var(--accent-cyan)' : 'var(--warning)']]));
        B.push(this.list('By department',[['Front office',8,3],['Housekeeping',14,2],['F&B service',12,3],['Engineering',4,2],['Management',3,0]].map(d => this.row(d[0],d[1] + ' staff · ' + (d[1] + d[2] * .5) + ' points',{right:idr(Math.round((d[1] + d[2] * .5) * 285000))}))));
        if (!approved) B.push(this.alert('warn','Awaiting approval','August is locked. September distribution is a draft until the GM approves it.','Submit to GM',() => { self.setState({svcSt:'approved'}); self.toast('finance','Submitted · Maya Sutrisno notified'); },'primary'));
        else B.push(this.blk('Note',{text:'Approved. Per-person statements are printable from the desktop.'}));
      } else if (tab === 'ar') {
        const A = [['Bank Mandiri',18400000,'0–30d','Rp 12,000,000'],['PT Telkom Indonesia',7200000,'60d+','Rp 4,000,000'],['Bali Dive Adventures',4100000,'0–30d','Rp 4,100,000'],['Kemenparekraf Events',22500000,'31–60d','Over limit']];
        B.push(this.kpis([['City ledger',idr(52200000),'billed to accounts'],['Overdue','2','accounts','var(--room-ooo)']]));
        B.push(this.list('Accounts',A.map(a => this.row(a[0],'Oldest bucket ' + a[2] + ' · ' + a[3],{right:idr(a[1]),pill:s.remind[a[0]] ? 'Reminded' : '',tone:'positive',btns:s.remind[a[0]] ? [] : [this.btn('Send reminder',() => { self.setState(x => ({remind:{...x.remind,[a[0]]:true}})); self.toast('finance','Reminder queued for ' + a[0]); },'secondary','mail')]}))));
      } else {
        const pend = s.arr.filter(a => !a.checked && !a.noShow).length, hard = pend > 0 && !s.auditDone;
        B.push(this.hero('Night audit',s.auditDone ? 'Rolled' : 'Due 02:00',s.auditDone ? 'Business date is now Wed 9 Sep' : '1 day to close',s.auditDone ? 'var(--accent-cyan)' : 'var(--fg-1)'));
        const items = [this.checkItem('Arrivals checked in',pend ? pend + ' not checked in. Blocks the roll.' : 'All checked in or marked no-show',!pend || s.auditDone,1),this.checkItem('Housekeeping caught up',dirty.length ? dirty.length + ' dirty rooms carry forward' : 'All rooms clean',!dirty.length,2),this.checkItem('Prior closes balanced','Last close Variance −25,000 on 5 Sep',true,3)];
        B.push(this.blk('Checklist',{title:'Pre-audit report',items,hasCta:true,ctaOff:s.auditDone || (hard && !s.auditOverride),ctaLabel:s.auditDone ? 'Rolled to 9 Sep' : hard && s.auditOverride ? 'Override and roll one day' : 'Roll one day',ctaRun:() => { self.setState(x => ({auditDone:true,arr:x.arr.map(a => a.checked ? a : {...a,noShow:true})})); self.toast('finance','Night audit complete'); }}));
        if (hard) B.push(this.chips([{label:s.auditOverride ? 'Override on' : 'Override blockers',pick:() => self.setState(x => ({auditOverride:!x.auditOverride})),style:this.chipStyle(s.auditOverride)}]));
      }
    } else if (role === 'guest') {
      const g = s.guest, a1 = s.arr.find(x => x.id === 'a1'), done = a1.pre || g.done, st = g.steps;
      const upd = k => () => self.setState(x => ({guest:{...x.guest,steps:{...x.guest.steps,[k]:true}}}));
      if (tab === 'stay') {
        B.push(this.hero('Welcome, Wirawan','Tue 8 Sep','Grand Samudra Bali · 3 nights · Deluxe King'));
        if (done) {
          B.push(this.alert('live','Pre-checked in','Your ID and card are on file. Collect your key at the front desk, or use your phone once the room is ready.'));
          B.push(this.kpis([['Room','101',a1.checked ? 'ready · checked in' : 'being prepared'],['Arrival','13:30','estimated']]));
        } else {
          const all = st.confirm && st.id && st.sign && st.pay;
          const IT = [['confirm','Confirm your stay','3 nights · Tue 8 to Fri 11 Sep · ' + idr(4872000),'Confirm'],['id','Verify your identity','Scan your passport','Scan ID'],['sign','Registration card','Sign on screen','Sign'],['pay','Payment card','Visa ending 4242 on file','Authorise']];
          const row = this.row('Online check-in','4 steps · about 2 minutes',{pill:Object.values(st).filter(Boolean).length + ' of 4',tone:'brand'});
          row.open = true; row.steps = IT.map((it,i) => ({...this.checkItem(it[1],it[2],!!st[it[0]],i + 1),btn:st[it[0]] ? 'Done' : it[3],run:upd(it[0])}));
          row.cta = {label:all ? 'Finish check-in' : 'Complete steps to finish',off:!all,run:() => { self.setState(x => ({guest:{...x.guest,done:true},arr:x.arr.map(y => y.id === 'a1' ? {...y,pre:true,paid:true} : y)})); self.toast('guest','You are pre-checked in. Room 101 will be ready by 13:30.'); }};
          B.push(this.list('Check in online',[row]));
          B.push(this.blk('Note',{text:'Finishing here marks you as pre-checked in on the front desk phone.'}));
        }
      } else if (tab === 'book') {
        const bk = g.bk, DW = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const BASE = {'Deluxe King':1450000,'Deluxe Twin':1550000,'Suite':2900000,'Pool Villa':4800000}, nightly = t => Math.round(BASE[t] * 0.95 / 1000) * 1000, total = nightly(bk.type) * bk.n * 1.21;
        const dl = d => { const x = new Date(Date.UTC(2026,8,8 + d)); return DW[x.getUTCDay()] + ' ' + x.getUTCDate() + ' Sep'; };
        B.push(this.hero('Book direct','Save 5%','Best rate guaranteed. No booking fee.','var(--accent-cyan)'));
        B.push(this.chips([1,2,3,4,5,6,7].map(d => ({label:dl(d).slice(0,3) + ' ' + dl(d).split(' ')[1],pick:() => self.setState(x => ({guest:{...x.guest,bk:{...x.guest.bk,in:d}}})),style:this.chipStyle(bk.in === d)}))));
        B.push(this.chips([1,2,3,4,5].map(n => ({label:n + (n === 1 ? ' night' : ' nights'),pick:() => self.setState(x => ({guest:{...x.guest,bk:{...x.guest.bk,n}}})),style:this.chipStyle(bk.n === n)}))));
        B.push(this.list('Rooms',Object.keys(BASE).map(t => this.row(t,'2 guests · free cancellation',{right:idr(nightly(t)),btns:[this.btn(bk.type === t ? 'Selected' : 'Select',() => self.setState(x => ({guest:{...x.guest,bk:{...x.guest.bk,type:t}}})),bk.type === t ? 'secondary' : 'primary')]}))));
        B.push(this.alert('ai','Your stay',dl(bk.in) + ' to ' + dl(bk.in + bk.n) + ' · ' + bk.type + ' · ' + idr(total) + ' incl. tax and service','Confirm booking',() => { const bkd = {in:bk.in,n:bk.n,type:bk.type,total}; self.setState(x => ({guest:{...x.guest,booked:bkd}})); self.toast('guest','Booking confirmed. Confirmation sent to your email.'); },'primary'));
        if (g.booked) B.push(this.alert('live','Booking confirmed',g.booked.type + ' · ' + dl(g.booked.in) + ' · ' + g.booked.n + ' nights · ' + idr(g.booked.total) + '. Free cancellation until 48 hours before arrival.'));
      } else {
        if (a1.checked) {
          B.push(this.hero('Room 101','Digital key','Active until Fri 11 Sep 12:00','var(--accent-cyan)'));
          B.push(this.list('Door',[this.row('Room 101','Tap to unlock. Hold phone near the door.',{pill:s.unlocked ? 'Unlocked' : 'Locked',tone:s.unlocked ? 'positive' : 'neutral',btns:[this.btn(s.unlocked ? 'Lock again' : 'Unlock door',() => { self.setState(x => ({unlocked:!x.unlocked})); self.toast('guest',s.unlocked ? 'Door locked' : 'Door unlocked'); },'primary','key-round')]})]));
        } else B.push(this.empty('key-round','Key not active yet','Your key activates after check-in. Room 101 is ' + (s.hk['101'] === 'Vacant Clean' || s.hk['101'] === 'Inspected' ? 'clean and ready.' : 'being prepared.')));
      }
    } else {
      if (tab === 'snapshot') {
        B.push(this.hero('Revenue · month to date','Rp 412,6 jt','+6.4% vs budget · 7 days closed','var(--fg-1)'));
        B.push(this.kpis([['Occupancy','71%','+2.0 pts vs LY','var(--accent-cyan)'],['RevPAR','Rp 1,120,000','+3.1% vs LY'],['ADR','Rp 1,578,000','+1.1%'],['Guest score','4.8','+0.1']]));
        B.push(this.bars('Weekly room revenue · Rp jt',[96,108,101,107],['W1','W2','W3','W4'],130));
      } else if (tab === 'revenue') {
        B.push(this.hbars('Revenue by source · MTD',[['Direct',42,'Rp 173 jt'],['Booking.com',26,'Rp 107 jt'],['Agoda',14,'Rp 58 jt'],['Expedia',10,'Rp 41 jt'],['Traveloka',8,'Rp 33 jt']]));
        B.push(this.hbars('By room type · MTD',[['Deluxe King',38,'Rp 157 jt'],['Deluxe Twin',27,'Rp 111 jt'],['Suite',22,'Rp 91 jt'],['Pool Villa',13,'Rp 54 jt']],'var(--accent-violet-hi)'));
      } else {
        const D = [['Weekly digest · 7 Sep','Revenue Rp 96 jt · Occupancy 71%'],['Weekly digest · 31 Aug','Revenue Rp 108 jt · Occupancy 76%'],['Monthly report · August','Revenue Rp 441 jt · RevPAR Rp 1,09 jt']];
        B.push(this.list('Reports',D.map(d => this.row(d[0],d[1],{btns:[this.btn('Open',() => self.toast('owner','Opening ' + d[0]),'secondary','file-text'),this.btn('Share',() => self.toast('owner','Share link copied'),'ghost','share-2')]}))));
      }
    }
    B = B.filter(b => !(b.isNote && /Nothing assigned|No open folios/.test(b.text)));
    if (role === 'frontdesk' && tab === 'today' && !left.length) B.push(this.empty('circle-check','No arrivals left','Quiet evening. The next arrival is tomorrow at 14:00.'));
    if (role === 'housekeeping' && tab === 'mine' && !dirty.length) B.push(this.empty('sparkles','All rooms are clean','Nothing assigned. Clean rooms wait for supervisor inspection.'));
    if (role === 'finance' && tab === 'cash' && !s.cash.some(c => c.due)) B.push(this.empty('banknote','No open folios','Quiet evening. Every in-house balance is settled.'));
    if (role === 'gm' && tab === 'exceptions' && ['audit','ooo','dirty','ar'].every(k => s.acked[k])) B.push(this.empty('circle-check','All exceptions assigned','Teams have been notified. You will get a push if one escalates.'));
    if (role === 'gm' && tab === 'approvals' && ['up','rate','ref'].every(k => s.appr[k])) B.push(this.empty('shield-check','Nothing to approve','New requests from the front desk appear here.'));
    return B;
  }
  grid(filter, tappable, role) {
    const s = this.state, self = this, next = {'Vacant Dirty':'Vacant Clean','Vacant Clean':'Inspected'};
    const rooms = Object.keys(s.hk).filter(r => filter === 'All' || s.hk[r] === filter);
    return this.blk('Grid',{cells:rooms.map(r => ({no:r,label:s.hk[r] === 'Vacant Dirty' ? 'Dirty' : s.hk[r].replace('Vacant ',''),
      style:'display:flex;flex-direction:column;gap:3px;align-items:flex-start;padding:12px;border-radius:var(--r-md);cursor:' + (tappable && next[s.hk[r]] ? 'pointer' : 'default') + ';color:var(--fg-1);background:' + this.HKW[s.hk[r]] + ';border:1px solid ' + this.HKC[s.hk[r]],
      tap:() => { if (tappable && next[s.hk[r]]) { self.setState(x => ({hk:{...x.hk,[r]:next[x.hk[r]]}})); self.toast(role,'Room ' + r + ' · ' + next[s.hk[r]]); } }}))});
  }
  renderVals() {
    const s = this.state, self = this;
    const offNow = s.offline;
    return {ctl:{offLabel:offNow ? 'Back online' : 'Go offline',errLabel:s.syncError ? 'Clear sync error' : 'Sync error',
      offStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid ' + (offNow ? 'var(--warning)' : 'rgba(238,244,255,.18)') + ';background:' + (offNow ? 'rgba(255,178,63,.16)' : 'rgba(238,244,255,.05)'),
      errStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid ' + (s.syncError ? 'var(--room-ooo)' : 'rgba(238,244,255,.18)') + ';background:' + (s.syncError ? 'rgba(255,90,122,.16)' : 'rgba(238,244,255,.05)'),
      pushStyle:'display:flex;align-items:center;gap:8px;border-radius:999px;padding:8px 14px;font-size:12.5px;cursor:pointer;color:var(--fg-1);border:1px solid rgba(238,244,255,.18);background:rgba(238,244,255,.05)',
      toggleOffline:() => { if (s.offline) { const q = s.queued; self.setState({offline:false,queued:{}}); self.ROLES.forEach(r => self.setState(x => ({toasts:{...x.toasts,[r.id]:'Back online. ' + (q[r.id] || 0) + ' queued change' + ((q[r.id] || 0) === 1 ? '' : 's') + ' synced.'}}))); setTimeout(() => self.setState({toasts:{}}),2600); } else self.setState({offline:true}); },
      toggleError:() => self.setState(x => ({syncError:!x.syncError})), sendPush:() => self.sendPush()},
      themeIcon:this.state.theme === 'light' ? 'moon' : 'sun',themeLabel:this.state.theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme',themeToggle:() => { const n = this.state.theme === 'light' ? 'dark' : 'light'; try { localStorage.setItem('upx_theme',n); document.documentElement.setAttribute('data-theme',n); } catch (e) {} this.setState({theme:n}); },phones:this.ROLES.map(r => { const tab = s.tab[r.id] || r.tabs[0][0], td = r.tabs.find(t => t[0] === tab) || r.tabs[0];
      return {helpOpen:!!s.hlp[r.id],helpToggle:() => self.setState(x => ({hlp:{...x.hlp,[r.id]:!x.hlp[r.id]}})),helpTips:(this.helpTips()[r.id] || this.helpTips().frontdesk).map(h => ({t:h[0],d:h[1]})),helpLink:'../desktop/help/' + encodeURI('Help centre.dc.html'),anchor:r.oid,oid:r.oid,href:'#' + r.oid,name:r.name,who:r.who,ini:r.ini,title:td[1] === 'Today' || td[1] === 'Overview' || td[1] === 'Snapshot' ? r.name : td[1],blocks:this.screen(r.id,tab),
        tabs:r.tabs.map(t => ({label:t[1],icon:t[2],go:() => self.setTab(r.id,t[0]),style:'flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;background:none;border:none;cursor:pointer;padding:6px 0;color:' + (t[0] === tab ? 'var(--accent-violet-hi)' : 'var(--fg-3)')})),
        hasToast:!!s.toasts[r.id],toast:s.toasts[r.id] || '',offline:s.offline,offlineText:'Offline. ' + (s.queued[r.id] || 0) + ' change' + ((s.queued[r.id] || 0) === 1 ? '' : 's') + ' queued, will sync on reconnect.',hasPush:!!s.push[r.id],pushText:s.push[r.id] ? s.push[r.id].text : '',pushGo:() => { const pu = s.push[r.id]; if (pu) { self.setTab(r.id,pu.tab); self.setState(x => { const n = {...x.push}; delete n[r.id]; return {push:n}; }); } }}; })};
  }
}


return Component;
};
