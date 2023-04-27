
// ==UserScript==
// @name            Direct links out
// @name:ru         Прямые ссылки наружу
// @version         4.22
// @description     Removes all this "You are leaving our site..." and other redirection trash from links.
// @description:ru  Убирает все эти "Бла-бла-бла, вы покидаете наш сайт..." и остальную переадресацию из ссылок.
// @author          nokeya & XX-J...
// @homepageURL     https://github.com/XX-J/Direct-links-out
// @run-at          document-start
// @icon            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXUlEQVR42uSRNQKAQAwEF+n49D4cd2dCfZkqMqdSd2ENq3viQQDlQ9gUFj6UcmtVaiYwnlfmI9E4C/SsMG75IsD4Vo0IPtXxSL7U4dL+8w/exlH4mEtciNJv8GkAAEAuRV4BUFYYAAAAAElFTkSuQmCC
// @updateURL       https://raw.githubusercontent.com/XX-J/Direct-links-out/master/Direct%20links%20out.user.js
//   4PDA
// @include         *://4pda.tld/*
//   AdGuard (forum)
// @match           *://forum.adguard.com/*
//   Большой вопрос
// @match           *://*.bolshoyvopros.ru/*
//   Car.ru
// @match           *://*.car.ru/*
//   DanielDefo
// @match           *://*.danieldefo.ru/*
//   DeviantArt
// @match           *://*.deviantart.com/*
//   Disqus
// @match           *://*.disq.us/*
// @match           *://*.disqus.com/*
//   ElectroTransport
// @match           *://electrotransport.ru/*
//   Facebook
// @match           *://*.facebook.com/*
//   Ferra.ru
// @match           *://*.ferra.ru/*
//   Фишки
// @match           *://*.fishki.net/*
//   ForumAvia
// @match           *://*.forumavia.ru/*
//   GitHub
// @match           *://github.com/*
// @match           *://*.github.io/*
//   Google
// @include         *://www.google.tld/*
// @match           *://news.google.com/*
//   Instagram
// @match           *://*.instagram.com/*
//   iXBT
// @match           *://*.ixbt.com/*
//   JoyReactor
// @match           *://*.joyreactor.cc/*
// @match           *://*.reactor.cc/*
// @match           *://*.joyreactor.com/*
//   Kickass Torrents
// @match           *://*.kickasstorrents.pw/*
// @match           *://*.kickassto.co/*
//   LinkedIn
// @match           *://*.linkedin.com/*
//   LiveInternet
// @match           *://*.liveinternet.ru/*
//   LRepacks
// @include         *://lrepacks.tld/*
//   Mail.ru
// @match           *://my.mail.ru/*
// @match           *://otvet.mail.ru/*
//   MCPEDL.com
// @match           *://mcpedl.com/*
//   Messenger
// @match           *://*.messenger.com/*
//   Addons.Mozilla.Org
// To allow extensions to work on sites from FireFox "black list" (like AMO) clean this "black list" by set `extensions.webextensions.restrictedDomains = ""`  and  `privacy.resistFingerprinting.block_mozAddonManager = true` in `about:config`.
// @match           *://addons.mozilla.org/*
//   MySKU
// @include         *://mysku.tld/*
//   Одноклассники
// @match           *://*.ok.ru/*
//   OSzone
// @match           *://*.oszone.net/*
//   Overclockers.ru
// @match           *://overclockers.ru/*
//   Picarto.tv
// @match           *://*.picarto.tv/*
//   pixiv
// @match           *://*.pixiv.net/*
//   PlayGround
// @match           *://*.playground.ru/*
//   Рамблер
// @match           *://*.rambler.ru/*
//   Repack.me
// @match           *://*.repack.me/*
//   RsLoad
// @match           *://*.rsload.net/*
//   RuBattle.net
// @match           *://*.rubattle.net/*
//   RuTracker.org
// @include         *://rutracker.tld/*
//   Slack
// @match           *://*.slack.com/*
//   SoundCloud
// @match           *://*.soundcloud.com/*
//   Steam
// @match           *://*.steampowered.com/*
// @match           *://*.steamcommunity.com/*
//   SubscribeStar
// @match           *://*.subscribestar.com/*
//   Taker.im
// @match           *://*.taker.im/*
//   Telegram
// @match           *://*.t.me/*
//   Военное обозрение
// @match           *://*.topwar.ru/*
//   Tumblr
// @match           *://*.tumblr.com/*
//   Twitter
// @match           *://*.twitter.com/*
//   Upwork
// @match           *://*.upwork.com/*
//   USBDev
// @match           *://*.usbdev.ru/*
//   ВКонтакте
// @match           *://*.vk.com/*
//   Wikimapia
// @match           *://wikimapia.org/*
//   Яндекс
// @include         /^https?://([^./]+\.)*yandex(\.com)?\.[^./]+/search//
//   ЯПлакалъ
// @match           *://*.yaplakal.com/*
//   YouTube
// @match           *://*.youtube.com/*
//   Zoon
// @match           *://*.zoon.ru/*
// ==/UserScript==


let RemoveAttributes, Anchor, After;
let HostName = location.hostname, Location = location.href;

function rwHRef(link) {
  if (/http/i.test(link.protocol)) {
    let HRef = link.href
    if (Anchor && Anchor.test(HRef)) HRef = decodeURIComponent(HRef).replace(Anchor, '');
    if (After && After.test(HRef)) HRef = decodeURIComponent(HRef).replace(After, '');
    if (/^(aHR0c|ZnRw|bWFnbmV0|ZWQya)/.test(HRef)) HRef = decodeURIComponent(atob(HRef));
    if (HRef != link.href) link.href = HRef;
  }
}

function rwLink(link) {
  if (/(ht|f)tp|magnet|ed2k/i.test(link.protocol)) {
    if (RemoveAttributes && (!Anchor || Anchor.test(link.href)))
      for (let Attribute of RemoveAttributes) link.removeAttribute(Attribute);
    rwHRef(link);
  }
}

function rwAll() {
  for (let link of document.links) rwLink(link);
  new MutationObserver( Mutations => {
    for (let Mutation of Mutations) {
      for (let Node of Mutation.addedNodes) {
        if (Node instanceof HTMLElement) {
          if (Node instanceof HTMLAnchorElement) rwLink(Node);
          for (let link of Node.querySelectorAll('a')) rwLink(link);
        }
      }
      if (Mutation.type === "attributes") rwLink(Mutation.target);
    }
  }).observe( document.body, { childList: true, attributeFilter: ['href'], subtree: true });
}


//   Determine anchors, functions and observers:

if (/4pda/i.test(HostName)) {
  Anchor = /.+\?u=/i;  After = /&[mnef]=.*/i;
}
else if (/adguard|github/i.test(HostName)) {
  rwHRef = link => {
    if (/^http.+\/AnonymousRedirect\/redirect\.html\?url=/i.test(link.href)) {
      link.href = decodeURIComponent(link.href).replace(/.+\/AnonymousRedirect\/redirect\.html\?url=/i, '');
      if (!/^https:\/\/href\.li\//i.test(link.href) && !/github\.io/i.test(HostName))
        link.href = 'https://href.li/?' + link.href;
    }
  }
}
else if (/bolshoyvopros|forumavia/i.test(HostName)) {
  Anchor = /.+\?l=/i;  After = /&src=.*/i;
}
else if (/(^|\.)car\.ru$/i.test(HostName)) {
  rwAll = () => {
    function ChangeTagName(OldElement) {
      let NewElement = document.createElement('a');
      for (let Attribute of OldElement.attributes) NewElement.setAttribute(Attribute.name, Attribute.value);
      let onclick = NewElement.getAttribute('onclick');  NewElement.removeAttribute('onclick');
      NewElement.setAttribute('href', onclick.slice(onclick.indexOf("href='") + 6, onclick.lastIndexOf("'")));
      NewElement.innerHTML = OldElement.innerHTML;
      OldElement.parentNode.replaceChild(NewElement, OldElement);
    }
    for (let Element of document.querySelectorAll('[onclick*="href"]')) ChangeTagName(Element);
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) {
        for (let Node of Mutation.addedNodes) {
          if (Node instanceof HTMLElement) {
            if (Node.matches('[onclick*="href"]')) ChangeTagName(Node);
            for (let Element of Node.querySelectorAll('[onclick*="href"]')) ChangeTagName(Element);
          }
        }
      }
    }).observe( document.body, { childList: true, subtree: true });
  }
}
else if (/danieldefo/i.test(HostName)) {
  RemoveAttributes = ['data-proxy-href'];
}
else if (/deviantart/i.test(HostName)) {
  Anchor = /.+outgoing\?/i;
}
else if (/disq/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;  After = /:[^.:]{9,}$/;
}
else if (/electrotransport|fishki|liveinternet|mcpedl|oszone|reactor|repack|soundcloud|steam|topwar|usbdev|wikimapia/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;
}
else if (/facebook|instagram|messenger/i.test(HostName)) {
  Anchor = /.+[?&]u=/i;  After = /[?&](e|h|fbclid)=.*/i;
}
else if (/ferra/i.test(HostName)) {
  Anchor = /.+click\/forums_out\//i;
}
else if (/\/\/www\.google\.[^/]+\/searc((?![^=][?&]tbm=(isch|shop)).)+$/i.test(Location)) {
  RemoveAttributes = ['data-jsarwt', 'data-usg', 'data-ved', 'ping'];
}
else if (/\/\/www\.google\..+[^=][?&]tbm=isch/i.test(Location)) {
  Anchor = /.+[?&](img)?url=/i;  After = /&(psig|imgrefurl)=.*/i;
  rwAll = () => {
    new MutationObserver( Mutations => {
      for (let Mutation of Mutations) if (Mutation.type === "childList") {
        if (Mutation.target === document.querySelector('[data-hp] div:not([aria-hidden="true"]) > c-wiz [role="link"]:only-of-type')) {
          Mutation.target.href = Mutation.target.firstChild.src;
          Mutation.target.setAttribute("rlhc", 1);
        }
      } else { rwHRef(Mutation.target) }
    }).observe( document.body, { childList: true, attributeFilter: ['href'], subtree: true });
  }
}
else if (/\/\/www\.google\..+[^=]([?&]tbm=shop|\/shopping)/i.test(Location)) {
  Anchor = /.+url\?(url|q)=/i;  After = /&(rct|sa)=.*/i;
}
else if (/news\.google/i.test(HostName)) {
  rwLink = link => {
    let jslog = link.getAttribute('jslog');
    if (/5:/.test(jslog)) {
      jslog = jslog.slice(jslog.indexOf(':') + 1, jslog.lastIndexOf(';')).replace(/[-.]/g, '+').replace(/_/g, '/');
      jslog = unescape(atob(jslog).replace(/\\u/g, '%u'));
      link.href = jslog.slice(jslog.indexOf('"') + 1, jslog.lastIndexOf('"'));
      link.removeAttribute('jslog');
      link.addEventListener('click', Event => Event.stopPropagation());
    }
  }
}
else if (/ixbt/i.test(HostName)) {
  Anchor = /.+\/live\/redirect\//i;
  rwLink = link => {
    if (/\/click\/\?c=/i.test(link.href) && /^((ht|f)tp|magnet|ed2k)/i.test(link.title))
      link.href = link.title;
    else if (Anchor.test(link.href)) {
      link.target = "_blank";
      rwHRef(link);
    }
  }
}
else if (/kickassto/i.test(HostName)) {
  RemoveAttributes = ['class'];
  Anchor = /.+confirm\/url\//i;
}
else if (/linkedin/i.test(HostName)) {
  Anchor = /.+[?&]url=/i;  After = /&(trk|messageThreadUrn)=.*/i;
}
else if (/my\.mail\.ru/i.test(HostName)) {
  Anchor = /.+\?u=/i;  After = /&c=.*/i;
}
else if (/otvet\.mail\.ru/i.test(HostName)) {
  Anchor = /.+\?externalLink=/i;
  rwLink = link => {
    if (/^((ht|f)tps?:\/\/((?!mail\.ru\/)[^/])+\/|magnet|ed2k)/i.test(link.href)) link.rel = "301";
  }
}
else if (/mozilla/i.test(HostName)) {
  Anchor = /.+\.outgoing\.[^/]+\/v.\/[^/]+\//i;  After = /[?&]utm_content=.*/i;
}
else if (/mysku/i.test(HostName)) {
  Anchor = /.+\?r=/i;  After = /&key=.*/i;
}
else if (/(^|\.)ok\.ru$/i.test(HostName)) {
  Anchor = /.+st\.link=/i;  After = /&st\.name=.*/i;
}
else if (/overclockers/i.test(HostName)) {
  rwLink = link => {
    if (!link.href && /^((ht|f)tp|magnet|ed2k)/i.test(link.dataset.link)) {
      link.href = link.dataset.link;
      link.target = "_blank";
    }
  }
}
else if (/picarto/i.test(HostName)) {
  Anchor = /.+referrer\?go=/i;  After = /&ref=.*/i;
}
else if (/pixiv/i.test(HostName)) {
  Anchor = /.+\/jump\.php\?(url=)?/i;
}
else if (/playground|rubattle/i.test(HostName)) {
  rwHRef = link => {
    if (/^http.+\/redirect\//i.test(link.href)) link.href = decodeURIComponent(link.href)
      .replace(/.+\/redirect\//i, '').replace(/[^/]+/, m => /\./.test(m) ? "http://" + m : m + ":/")
  }
}
else if (/rambler/i.test(HostName)) {
  Anchor = /.+[?&]redirect_url=/i;  After = /[?&]utm_source=.*/i;
}
else if (/rsload/i.test(HostName)) {
  Anchor = /.+(\/download\?a(%3A|:)|\?url=)/i;
}
else if (/rutracker/i.test(HostName)) {
  rwLink = link => {
    if (link.classList.contains('postLink') &&
      !/^https?:\/\/(rutracker\.(org|net|nl)\/|www\.youtube\.com\/(?!user)|youtu\.be\/|vimeo\.com\/\d+$|soundcloud\.com\/)/i.test(link.href)) {
      link.classList.add('p-ext-link-initialized');
      link.target = "_blank";
    }
  }
}
else if (/slack/i.test(HostName)) {
  RemoveAttributes = ['onclick', 'onmouseover'];
}
else if (/subscribestar/i.test(HostName)) {
  RemoveAttributes = ['data-href'];
  Anchor = /.+\?url=/i;  After = /\n/g;
}
else if (/taker/i.test(HostName)) {
  Anchor = /.+phpBB2\/goto\//i;
}
else if (/(^|\.)t\.me$/i.test(HostName)) {
  RemoveAttributes = ['onclick'];
  Anchor = /.+\?url=/i;  After = /&(amp|rhash)[;=].*/i;
}
else if (/tumblr/i.test(HostName)) {
  Anchor = /.+redirect\?z=/i;  After = /&t=.*/i;
}
else if (/twitter/i.test(HostName)) {
  rwLink = async link => {
    if (/^https?:\/\/t\.co\//i.test(link.href)) {
      if (/^((ht|f)tp|\/\/|magnet|ed2k)/i.test(link.text)) link.href = link.text.replace('…', '');
      else link.href = (await (await fetch(link.href)).text()).replace(/.+\<title\>|\<\/title.+/ig, '');
    }
  }
}
else if (/upwork/i.test(HostName)) {
  Anchor = /.+leaving-odesk\?ref=/i;
}
else if (/vk|zoon/i.test(HostName)) {
  Anchor = /.+to=/i;  After = /[?&](cc_key|from_content|post|hash)=.*/i;
}
else if (/yandex/i.test(HostName)) {
  Anchor = /.+&img_url=/i;  After = /&(pos|rpt|ysclid)=.*/i;
  rwLink = link => {
    if (/(ht|f)tp|magnet|ed2k/i.test(link.protocol)) {
      link.removeAttribute('data-counter');  link.removeAttribute('data-log-node');
      if (!link.classList.contains('more-button')) rwHRef(link);
    }
  }
}
else if (/yaplakal/i.test(HostName)) {
  Anchor = /.+go\/\?/i;
}
else if (/youtube/i.test(HostName)) {
  rwHRef = link => {
    if (/^http.+[?&]q=/i.test(link.href)) {
      link.href = decodeURIComponent(link.href).replace(/.+[?&]q=/i, '');
      if (/&v=.*/i.test(link.href)) link.href = link.href.replace(/&v=.*/i, '');
    }
  }
}

//   Redirecting wrong link to right link from outer app.
if (window == top) rwHRef(location);
document.readyState == "loading" ? document.addEventListener('DOMContentLoaded', rwAll, { once: true }) : rwAll();
