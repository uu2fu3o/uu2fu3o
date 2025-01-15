import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as s,o as i}from"./app-DS0ZCcmM.js";const t={};function l(p,e){return i(),a("div",null,e[0]||(e[0]=[s(`<h1 id="ntlm基础" tabindex="-1"><a class="header-anchor" href="#ntlm基础"><span>NTLM基础</span></a></h1><h2 id="lm-hash-ntlm-hash" tabindex="-1"><a class="header-anchor" href="#lm-hash-ntlm-hash"><span>LM HASH &amp; NTLM HASH</span></a></h2><p>这部分的内容在之前的文章就已经介绍过，就不再赘述，详细可以参看以前的文章</p><p><a href="https://uu2fu3o.gitbook.io/articles/articles/shen-tou-ce-shi/nei-wang-ti-xi-jian-she/ha-xi-chuan-di-gong-ji-pth" target="_blank" rel="noopener noreferrer">PTH</a></p><h2 id="ntlm身份验证" tabindex="-1"><a class="header-anchor" href="#ntlm身份验证"><span>NTLM身份验证</span></a></h2><p>之前介绍的不够详细，再看看</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/123.png" alt="123" tabindex="0" loading="lazy"><figcaption>123</figcaption></figure><p>1.用户登录客户端电脑</p><p>2.(type 1)客户端向服务器发送type 1(协商)消息,它主要包含客户端支持和服务器请求的功能列表。</p><p>3.(type 2)服务器用type 2消息(质询)进行响应，这包含服务器支持和同意的功能列表。但是，最重要的是，它包含服务器产生的Challenge。</p><p>4.(type 3)客户端用type 3消息(身份验证)回复质询。用户接收到步骤3中的challenge之后，使用用户hash与challenge进行加密运算得到response，将response,username,challeng发给服务器。消息中的response是最关键的部分，因为它们向服务器证明客户端用户已经知道帐户密码。</p><p>5.服务器拿到type 3之后，使用challenge和用户hash进行加密得到response2与type 3发来的response进行比较。如果用户hash是存储在域控里面的话，那么没有用户hash，也就没办法计算response2。也就没法验证。这个时候用户服务器就会通过netlogon协议联系域控，建立一个安全通道,然后将type 1,type 2，type3 全部发给域控(这个过程也叫作Pass Through Authentication认证流程)</p><p>6.域控使用challenge和用户hash进行加密得到response2，与type 3的response进行比较</p><h2 id="net-ntlm-hash" tabindex="-1"><a class="header-anchor" href="#net-ntlm-hash"><span>Net-ntlm Hash</span></a></h2><p>在type3中的响应，有六种类型的响应</p><ul><li><p>LM(LAN Manager)响应 - 由大多数较早的客户端发送，这是“原始”响应类型。</p></li><li><p>NTLM v1响应 - 这是由基于NT的客户端发送的，包括Windows 2000和XP。</p></li><li><p>NTLMv2响应 - 在Windows NT Service Pack 4中引入的一种较新的响应类型。它替换启用了 NTLM版本2的系统上的NTLM响应。</p></li><li><p>LMv2响应 - 替代NTLM版本2系统上的LM响应。</p></li><li><p>NTLM2会话响应 - 用于在没有NTLMv2身份验证的情况下协商NTLM2会话安全性时，此方案会更改LM NTLM响应的语义。</p></li><li><p>匿名响应 - 当匿名上下文正在建立时使用; 没有提供实际的证书，也没有真正的身份验证。“存 根”字段显示在类型3消息中。</p><p>这六种使用的加密流程一样，都是前面我们说的Challenge/Response 验证机制,区别在Challenge和加密算法不同。</p><p>这里我们侧重讲下NTLM v1响应和NTLMv2响应</p></li><li><p>v2是16位的Challenge，而v1是8位的Challenge</p></li></ul><p>具体的计算也在PTH一篇中讲过了，了解即可</p><h2 id="ssp-sspi" tabindex="-1"><a class="header-anchor" href="#ssp-sspi"><span>SSP &amp; SSPI</span></a></h2><p>SSPI是一个软件接口。分布式编程库（如 RPC）可以将其用于经过身份验证的通信。一个或多个软件模块提供实际的身份验证功能。每个模块（称为安全支持提供程序 （SSP））都作为动态链接库 （DLL） 实现。</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>SSPI(Security Support Provider Interface)</span></span>
<span class="line"><span>这是 Windows 定义的一套接口，此接口定义了与安全有关的功能函数， 用来获得验证、信息完整性、信息隐私等安全功能，就是定义了一套接口函数用来身份验证，签名等，但是没有具体的实现。</span></span>
<span class="line"><span>SSP(Security Support Provider)</span></span>
<span class="line"><span>​ SSPI 的实现者，对SSPI相关功能函数的具体实现。微软自己实现了如下的 SSP，用于提供安全功能：</span></span>
<span class="line"><span>NTLM SSP</span></span>
<span class="line"><span>Kerberos</span></span>
<span class="line"><span>Cred SSP</span></span>
<span class="line"><span>Digest SSP</span></span>
<span class="line"><span>Negotiate SSP</span></span>
<span class="line"><span>Schannel SSP</span></span>
<span class="line"><span>Negotiate Extensions SSP</span></span>
<span class="line"><span>PKU2U SSP</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>SSP</strong>可用作后门</p><h2 id="lmcompatibilitylevel" tabindex="-1"><a class="header-anchor" href="#lmcompatibilitylevel"><span>LmCompatibilityLevel</span></a></h2><p>此安全设置确定网络登录使用的质询/响应身份验证协议。此选项会影响客户端使用的身份验证协议的等级、协商的会话安全的等级以及服务器接受的身份验证的等级，其设置值如下:</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>发送 LM NTLM 响应: 客户端使用 LM 和 NTLM 身份验证，而决不会使用 NTLMv2 会话安全；域控制器接受 LM、NTLM 和 NTLMv2 身份验证。</span></span>
<span class="line"><span>发送 LM &amp; NTLM - 如果协商一致，则使用 NTLMv2 会话安全: 客户端使用 LM 和 NTLM 身份验证，并且在服务器支持时使用 NTLMv2 会话安全；域控制器接受 LM、NTLM 和 NTLMv2 身份验证。</span></span>
<span class="line"><span>仅发送 NTLM 响应: 客户端仅使用 NTLM 身份验证，并且在服务器支持时使用 NTLMv2 会话安全；域控制器接受 LM、NTLM 和 NTLMv2 身份验证。</span></span>
<span class="line"><span>仅发送 NTLMv2 响应: 客户端仅使用 NTLMv2 身份验证，并且在服务器支持时使用 NTLMv2 会话安全；域控制器接受 LM、NTLM 和 NTLMv2 身份验证。</span></span>
<span class="line"><span>仅发送 NTLMv2 响应\\拒绝 LM: 客户端仅使用 NTLMv2 身份验证，并且在服务器支持时使用 NTLMv2 会话安全；域控制器拒绝 LM (仅接受 NTLM 和 NTLMv2 身份验证)。</span></span>
<span class="line"><span>仅发送 NTLMv2 响应\\拒绝 LM &amp; NTLM: 客户端仅使用 NTLMv2 身份验证，并且在服务器支持时使用 NTLMv2 会话安全；域控制器拒绝 LM 和 NTLM (仅接受 NTLMv2 身份验证)。</span></span>
<span class="line"><span>默认值:</span></span>
<span class="line"><span>Windows 2000 以及 Windows XP: 发送 LM &amp; NTLM 响应</span></span>
<span class="line"><span>Windows Server 2003: 仅发送 NTLM 响应</span></span>
<span class="line"><span>Windows Vista、Windows Server 2008、Windows 7 以及 Windows Server 2008 R2及以上: 仅发送 NTLMv2 响应</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://learn.microsoft.com/en-us/windows/security/threat-protection/security-policy-settings/network-security-lan-manager-authentication-level" target="_blank" rel="noopener noreferrer">详细介绍</a></p><h2 id="相关安全问题" tabindex="-1"><a class="header-anchor" href="#相关安全问题"><span>相关安全问题</span></a></h2><h3 id="利用ntlm收集信息" tabindex="-1"><a class="header-anchor" href="#利用ntlm收集信息"><span>利用NTLM收集信息</span></a></h3><p><a href="https://www.zcgonvh.com/post/CSharp_smb_version_Detection.html" target="_blank" rel="noopener noreferrer">c#版本的Ssmb_version</a></p><p>在type2返回challenge的过程中，同时返回了目标主机的版本，主机名等信息，ntlm是一个嵌入式的协议，消息的传输依赖于使用ntlm的上层协议，比如SMB,LDAP,HTTP等。我们以SMB为例。在目标主机开放了445或者139的情况，通过给服务器发送一个type1的请求，然后解析type2的响应。就可以收集到一些信息。</p><p>上面链接的脚本拿过来编译一下基本就能使用</p><p>msf中也有类似的模块auxiliary/scanner/smb/smb_version</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/1234.png" alt="1234" tabindex="0" loading="lazy"><figcaption>1234</figcaption></figure><h3 id="ntlm-relay" tabindex="-1"><a class="header-anchor" href="#ntlm-relay"><span>NTLM RELAY</span></a></h3><p>见下一篇</p>`,34)]))}const c=n(t,[["render",l],["__file","NTLM基础.html.vue"]]),h=JSON.parse('{"path":"/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/NTLM%E4%B8%93%E9%A2%98/NTLM%E5%9F%BA%E7%A1%80.html","title":"NTLM基础","lang":"zh-CN","frontmatter":{"description":"NTLM基础 LM HASH & NTLM HASH 这部分的内容在之前的文章就已经介绍过，就不再赘述，详细可以参看以前的文章 PTH NTLM身份验证 之前介绍的不够详细，再看看 123123 1.用户登录客户端电脑 2.(type 1)客户端向服务器发送type 1(协商)消息,它主要包含客户端支持和服务器请求的功能列表。 3.(type 2)服务...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/NTLM%E4%B8%93%E9%A2%98/NTLM%E5%9F%BA%E7%A1%80.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"NTLM基础"}],["meta",{"property":"og:description","content":"NTLM基础 LM HASH & NTLM HASH 这部分的内容在之前的文章就已经介绍过，就不再赘述，详细可以参看以前的文章 PTH NTLM身份验证 之前介绍的不够详细，再看看 123123 1.用户登录客户端电脑 2.(type 1)客户端向服务器发送type 1(协商)消息,它主要包含客户端支持和服务器请求的功能列表。 3.(type 2)服务..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/123.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"NTLM基础\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/123.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/1234.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"LM HASH & NTLM HASH","slug":"lm-hash-ntlm-hash","link":"#lm-hash-ntlm-hash","children":[]},{"level":2,"title":"NTLM身份验证","slug":"ntlm身份验证","link":"#ntlm身份验证","children":[]},{"level":2,"title":"Net-ntlm Hash","slug":"net-ntlm-hash","link":"#net-ntlm-hash","children":[]},{"level":2,"title":"SSP & SSPI","slug":"ssp-sspi","link":"#ssp-sspi","children":[]},{"level":2,"title":"LmCompatibilityLevel","slug":"lmcompatibilitylevel","link":"#lmcompatibilitylevel","children":[]},{"level":2,"title":"相关安全问题","slug":"相关安全问题","link":"#相关安全问题","children":[{"level":3,"title":"利用NTLM收集信息","slug":"利用ntlm收集信息","link":"#利用ntlm收集信息","children":[]},{"level":3,"title":"NTLM RELAY","slug":"ntlm-relay","link":"#ntlm-relay","children":[]}]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":5.18,"words":1554},"filePathRelative":"渗透测试/NTLM专题/NTLM基础.md","localizedDate":"2025年1月16日","excerpt":"\\n<h2>LM HASH &amp; NTLM HASH</h2>\\n<p>这部分的内容在之前的文章就已经介绍过，就不再赘述，详细可以参看以前的文章</p>\\n<p><a href=\\"https://uu2fu3o.gitbook.io/articles/articles/shen-tou-ce-shi/nei-wang-ti-xi-jian-she/ha-xi-chuan-di-gong-ji-pth\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">PTH</a></p>\\n<h2>NTLM身份验证</h2>\\n<p>之前介绍的不够详细，再看看</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/main/pac/123.png\\" alt=\\"123\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>123</figcaption></figure>","autoDesc":true}');export{c as comp,h as data};
