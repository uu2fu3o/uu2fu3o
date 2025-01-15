import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a as s,o as n}from"./app-DS0ZCcmM.js";const l="/articles/assets/%E5%9F%9F%E6%9E%97%E6%BC%94%E7%A4%BA%E5%9B%BE-BTsDaD74.png",t="/articles/assets/BitFilterRule-ID-iQRupaxM.png",r={};function d(p,e){return n(),i("div",null,e[0]||(e[0]=[s('<h2 id="内网工作环境" tabindex="-1"><a class="header-anchor" href="#内网工作环境"><span>内网工作环境</span></a></h2><h3 id="工作组-work-group" tabindex="-1"><a class="header-anchor" href="#工作组-work-group"><span>工作组(work group)</span></a></h3><p>工作组作为资源管理模式的一种，用于对计算机行使功能进行划分，每个工作组中有若干计算机。</p><p>注意:</p><p>1.将计算机加入工作组中时，若指定的工作组不存在，则会创建一个新的工作组</p><p>2.在默认情况下，局域网内的计算机都是采用工作组的方式进行资源管理，即处在名为WORKGROUP的工作组中</p><h3 id="域" tabindex="-1"><a class="header-anchor" href="#域"><span>域</span></a></h3><p>域同样时资源管理模式的一种，相比于工作组这种小型的管理模式，域更适合大型的计算机网络管理，域中的所有计算机，用户账户等等，都需要通过域控机器进行统一的身份验证，通过验证的用户能够访问什么资源，有什么权限取决去用户在域中的身份，域管理员用户无疑是权限最高的用户，所以通常进行内网渗透的最终目标就是拿下域管机器</p><h4 id="单域" tabindex="-1"><a class="header-anchor" href="#单域"><span>单域</span></a></h4><p>单域，顾名思义在整个网络环境下只存在一个域</p><h4 id="父域和子域" tabindex="-1"><a class="header-anchor" href="#父域和子域"><span>父域和子域</span></a></h4><p>将一个单域划分为多个部分，被划分的单域称为父域，划分出来的部分称为子域，每个子域拥有自己的安全策略，对应管理相应的资源</p><p>命名规则：<a href="http://xn--hack-k84f3ln6j15hlvbo1s8p7ba3723j.com" target="_blank" rel="noopener noreferrer">假设有有一单域名为hack.com</a>,<a href="http://xn--asia-ze9fnc3d083dsqh.hack.xn--comua-tn9h.hack.com" target="_blank" rel="noopener noreferrer">划分出子域asia.hack.com和ua.hack.com</a></p><p>​ 子域是整个域名中的一个段，各子域之间通过&quot;.&quot;来进行划分，一个&quot;.&quot;代表域名的一个层级</p><p><strong>问：域的管理员是否对子域同样具有所有权限？</strong></p><p>答：父域的管理员并不自动具有对子域的所有权限。域之间的权限和控制是独立管理的，并且在域的安全策略中进行配置和控制。通常情况下，父域管理员可能具有一些管理子域的权限，例如创建和删除子域、配置子域的访问控制策略、分配一部分权限给子域的管理员等。但对于子域内部的具体操作和资源访问，通常需要子域管理员单独进行授权和管理。</p><h4 id="域树" tabindex="-1"><a class="header-anchor" href="#域树"><span>域树</span></a></h4><p>通过信任关系建立起来的域集合。域树中的命名具有连续性，域名层次越深，级别越低。</p><p>注意：域树中，域管理员只能管理本域，不能访问或者管理其他域。如果两个域之间需要互相访问，就需要建立信任关系 。</p><p><strong>问:两个建立信任关系的域，域管用户对另一个域具有控制权吗？</strong></p><p>答：并不，具体权限需要另一域的管理员进行单独赋予</p><h4 id="域林" tabindex="-1"><a class="header-anchor" href="#域林"><span>域林</span></a></h4><p>指一个或多个没有形成连续名称空间的域树组成的域树集合，通俗来说就是两个单域划分出来的域树连在了一起，给出一张图就不难理解上面域的所有概念了</p><figure><img src="'+l+`" alt="域林演示图" tabindex="0" loading="lazy"><figcaption>域林演示图</figcaption></figure><h4 id="域控制器-domain-controller-dc" tabindex="-1"><a class="header-anchor" href="#域控制器-domain-controller-dc"><span>域控制器(Domain Controller,DC)</span></a></h4><p>作为域环境的核心的服务器计算机，用于在域中响应安全身份认证请求，操控着资源，权限等，简称为域控。</p><p>一个域环境可以有一台或多台域控制器，如果一台域控机器掉了，还可以通过其他域控机器维持域的正常工作</p><p><strong>问：域环境中有多台域控机器时，如何一次性列出</strong></p><p>答：利用nltest或dsqurey,具体命令如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>打开命令提示符（CMD）或 PowerShell。</span></span>
<span class="line"><span>运行以下命令：nltest /dclist:&lt;域名&gt;，将 &lt;域名&gt; 替换为你的域名。</span></span>
<span class="line"><span>命令会列出域中的所有域控制器。</span></span>
<span class="line"><span>打开命令提示符（CMD）或 PowerShell。</span></span>
<span class="line"><span>运行以下命令：dsquery server -forest。</span></span>
<span class="line"><span>命令会列出域中的所有域控制器。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="活动目录-active-directory-ad" tabindex="-1"><a class="header-anchor" href="#活动目录-active-directory-ad"><span>活动目录(Active Directory,AD)</span></a></h2><p>安装在域控制器上，为整个域环境提供集中目录管理服务的组件，存储了策略，用户，组等等资源。目录数据存储在Ntds.dit文件中。提供计算机集中管理，用户集中管理等集中管理功能</p><h3 id="ntds-dit文件" tabindex="-1"><a class="header-anchor" href="#ntds-dit文件"><span>Ntds.dit文件</span></a></h3><p>二进制文件，活动目录数据库，默认路径为域控的&quot;%SystemRoot%\\ntds\\ntds.dit&quot;或“C:\\Windows\\NTDS”，文件中包括有关与用户的，用户密码的哈希散列值，用户组等等重要信息，该文件利用存储来系统SYSTEM文件的密钥对这些哈希值进行加密</p><p>注意：在非域环境的工作组环境中，用户的登录凭据等信息存储在本地SAM文件中</p><h3 id="目录服务与ldap" tabindex="-1"><a class="header-anchor" href="#目录服务与ldap"><span>目录服务与LDAP</span></a></h3><p>轻型目录访问协议（[Lightweight Directory Access Protocol，LDAP)，用于访问目录数据库，活动目录利用LDAP名称路径来描述对象在活动目录中的位置</p><p><a href="https://zh.wikipedia.org/wiki/%E8%BD%BB%E5%9E%8B%E7%9B%AE%E5%BD%95%E8%AE%BF%E9%97%AE%E5%8D%8F%E8%AE%AE" target="_blank" rel="noopener noreferrer">https://zh.wikipedia.org/wiki/轻型目录访问协议</a></p><h3 id="活动目录分区" tabindex="-1"><a class="header-anchor" href="#活动目录分区"><span>活动目录分区</span></a></h3><p>分为域分区，配置分区，架构分区</p><h3 id="活动目录的查询" tabindex="-1"><a class="header-anchor" href="#活动目录的查询"><span>活动目录的查询</span></a></h3><h4 id="ldap按位查询" tabindex="-1"><a class="header-anchor" href="#ldap按位查询"><span>ldap按位查询</span></a></h4><p>语法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;属性名称&gt;：&lt;BitFilterRule-ID&gt; := &lt;十进制比较值&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>其中BitFilterRule-ID指的就是位查询规则对应的ID，如下<img src="`+t+`" alt="BitFilterRule-ID" loading="lazy"></p><p>例如查询userAccountControl属性的HOMEDIR_REQUIRED和MNS_LOGON_ACCOUN如下</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>(userAccountControl:1.2.840.113556.1.4.803:=131080)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h4 id="使用adfind查询" tabindex="-1"><a class="header-anchor" href="#使用adfind查询"><span>使用AdFind查询</span></a></h4><p>域信息查询工具，可在域内任意一台机器上使用，具体语法</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>AdFind.exe [switches] [-b basedn] [-f filter] [attr list]</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>-b指定一个BaseDN作为查询的根，-f作为LDAP的过滤条件，attr list为需要显示的属性</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>AdFind.exe -b dc=hack,dc=com -f &quot;objectClass=computer&quot; name operatingSystem</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>查询hack.com域中的所有computer对象，并过滤对象的name和operatinfSystem属性</p><h2 id="域用户与机器用户" tabindex="-1"><a class="header-anchor" href="#域用户与机器用户"><span>域用户与机器用户</span></a></h2><h3 id="域用户" tabindex="-1"><a class="header-anchor" href="#域用户"><span>域用户</span></a></h3><p>域环境中的用户，域用户账户位于全局组Domain User中，而计算机本地用户账户位于本地User组中，当计算机加入域时，Domain user组会被自动添加到计算机user组中，即域用户能够登录域中任意一台计算机并执行命令</p><h3 id="机器用户" tabindex="-1"><a class="header-anchor" href="#机器用户"><span>机器用户</span></a></h3><p>一种特殊的域用户，域用户具有的属性他都有。计算机上的本地用户SYSTEM对应域中的机器账户，在域中的名称为&quot;机器名+$&quot;,可以在计算机上利用SYSTEM用户执行域中命令</p><h2 id="域用户组的分类和权限" tabindex="-1"><a class="header-anchor" href="#域用户组的分类和权限"><span>域用户组的分类和权限</span></a></h2><p>具有相同权限的用户划为一组，对组赋予特权即对组内用户赋予特权</p><h3 id="安全组权限" tabindex="-1"><a class="header-anchor" href="#安全组权限"><span>安全组权限</span></a></h3><p>根据作用范围可分为域本地组，通用组和全局组</p><h4 id="域本地组" tabindex="-1"><a class="header-anchor" href="#域本地组"><span>域本地组</span></a></h4><p>作用于本域，只能访问本域中的资源</p><p>注意：域本地组可以包含域林内任意域和通用组，全局组的用户，但无法包含其他域中的域本地组</p><p>例如：只有林根域具有通用组(Enterprise Admins)，子域的域本地组Administrator会添加通用组到域本地组中，实现根域对子域的资源访问</p><p>系统内置域本地组</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Administrator //管理员组</span></span>
<span class="line"><span>Print Operators  //打印机组</span></span>
<span class="line"><span>Backup Operators //备份操作员组</span></span>
<span class="line"><span>Remote Desktop Users //远程登录组，只有该组成员才能远程登陆服务器</span></span>
<span class="line"><span>Account Operators //账号操作员组</span></span>
<span class="line"><span>Server Operators //服务器操作员组</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="通用组" tabindex="-1"><a class="header-anchor" href="#通用组"><span>通用组</span></a></h4><p>可作用于域林中的任一域，可包含域林中的任何域的用户账户，全局组和其他通用组，不能包含域本地组，可嵌套到其他通用组</p><p>常见系统内置通用组及其权限</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Enterprise Admins //组织系统管理员，该组时域林根域中的一个组，对所有的域控制器具有完全的权限</span></span>
<span class="line"><span>Schema Admins //架构管理员组，根域中的一组，可修改活动目录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="全局组" tabindex="-1"><a class="header-anchor" href="#全局组"><span>全局组</span></a></h4><p>可作用于域林中的所有域，介于域本地组和通用组之间的一种组，全局组只能包含本域的用户。可以嵌套到同一个域的另一个全局组中，也可嵌套到其他域的通用组和域本地组，全局组可以在任意位置被管理员赋予访问权限</p><p>常见系统内置全剧组和权限</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Domain Admins //域管理员组</span></span>
<span class="line"><span>Domain Users //域用户组</span></span>
<span class="line"><span>Domain Computers //域成员主机组</span></span>
<span class="line"><span>Domain Controllers //域控制器组，该组成员包含域中所有域控制器</span></span>
<span class="line"><span>Domain Guest //域方可用户组，该组成员默认为域访客用户</span></span>
<span class="line"><span>Group Policy Creator Owners //新建组策略对象组，该组成员可以修改域的组策略</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="组织单位" tabindex="-1"><a class="header-anchor" href="#组织单位"><span>组织单位</span></a></h2><p>组织单位(Organization Unit,OU)是一个可以将域中用户，组和计算机等对方放入其中的容器对象，是可以指派组策略或委派管理权限的最小作用域或单元。</p><p>所有组织单位在AD中都是organizationUnit类时可通过Adfind查询所有的OU</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>Adfind.exe -b &quot;dc=hack,dc=com&quot; -f &quot;(objectClass=organizationUnit)&quot; -dn</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h2 id="访问控制" tabindex="-1"><a class="header-anchor" href="#访问控制"><span>访问控制</span></a></h2><h3 id="windows访问控制模型" tabindex="-1"><a class="header-anchor" href="#windows访问控制模型"><span>windows访问控制模型</span></a></h3><p>主要有访问令牌(Acess Token)和安全描述符(Security Descriptor)两部分组成，分别由访问者和被访问者持有，对比二者判断是否有访问权限</p><p>1.访问令牌</p><p>用户登录，windows为用户创建一个访问令牌，包含了登录过程返回的SID和本地给予的用户权限策略列表，具体哪些SID内容请自行查询</p><p>2.安全描述符</p><p>安全描述符主要包含</p><ol><li>安全标识符（Security Identifier，SID）：SID是一个唯一的标识符，用于标识用户、组或其他安全主体。安全描述符中包含了与对象相关联的所有安全主体的SID。SID可以用来识别具体的用户或组，并用于权限的授权和验证。</li><li>访问控制列表（Access Control List，ACL）：ACL是一个有序的条目列表，每个条目包含了一个SID以及与该SID相关联的访问权限。ACL用于定义对象的访问控制规则，决定了哪些安全主体具有对对象的特定权限（如读取、写入、执行等）。</li></ol><p>当然还有其他三样内容</p><p>注意:SID用来标识用户账户和该用户所属的组。ACL分为DACL和SACL两种</p><h3 id="访问控制列表-acl" tabindex="-1"><a class="header-anchor" href="#访问控制列表-acl"><span>访问控制列表(ACL)</span></a></h3><p>ACL是访问控制项(ACE)的列表，每个访问控制项制定了一系列的访问权限，在A对B进行访问的过程中，ACL主要有两个作用，一是进行访问权限控制，判断主体能不能访问该安全对象，二是进行日志记录功能，所以安全对象的安全对象可通过两种访问控制列表DACL和SACL进行控制</p><p>1.DACL</p><p>DACL(自主访问控制列表)是安全对象的访问控制策略，其中定义了该安全对象的访问策略，DACL是由访问控制项(ACE)组成，每条ACE制定了哪些用户对哪些对象拥有什么样的访问权限。具体验证流程请自行查看，大致可归纳为，当有一主体访问对象时，对象会一条ACE一ACE的检查具体的SID是否对应，以此决定该主体有无权限访问该对象</p><p>2.SACL</p><p>系统访问控制列表(SACL),是安全主体对对象的访问行为的审计策略，同样由ACE条目构成，ACE定义了哪些行为会被哪些日志文件记录</p><p>3.查看与修改访问控制列表</p><p>利用工具lcacls,执行命令为hacker用户添加指定文件或目录(及其子目录)的完全访问控制权</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>icacls C:\\Users\\Willian\\Desktop\\Test /grant Hacker:(OI)(CI)(F) /t</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>OI代表对象继承，CI代表容器继承，F代表完全访问</p><h2 id="组策略" tabindex="-1"><a class="header-anchor" href="#组策略"><span>组策略</span></a></h2><p>Windows环境下管理用户账户的一种手段，提供了许多管理环境和功能。包含计算机本地组策略(非域环境)，和域组策略，域组策略可以对域中所有计算机和用户进行管理，重点了解域组策略</p><h3 id="组策略对象-gpo" tabindex="-1"><a class="header-anchor" href="#组策略对象-gpo"><span>组策略对象(GPO)</span></a></h3><p>包含应用于特定用户或计算机的策略信息和具体配置，在设置组策略时只需要将该组策略对象链接到指定的站点，域和组织单位，策略值就会应用到该站点，域和组织单位的所有用户和计算机</p><p>GPC由组策略容器(GPC)和组策略模板(GPT)两个组件组成，分别储存在域控制器的不同位置上，容器储存在活动目录的·域分区，策略模板在域控制器的如下文件文件夹</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&quot;%SYSTEMROOT%\\SYSVOL\\sysvlo\\域名\\Policies&quot;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>1.组策略容器</p><p>记录着该组策略对象的策略名称，标识组策略的GUID，组策略链接到的作用域，组策略模板的路径，组策略的版本信息等各种元数据，组策略容器的路径为</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>CN=Policies,CN=System,DC=hack,DC=com</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>2.组策略模板</p><p>以GUID标识的各组策略配置目录中包含以下内容</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>MACHINE:包含一些针对该组策略的整个作用域中计算机的具体配置</span></span>
<span class="line"><span>USER: 包含一些针对该组策略的整个作用域中用户的具体配置</span></span>
<span class="line"><span>GPT.INI: 包含一些关于该组策略的策略名称，版本信息等配置信息</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,112)]))}const o=a(r,[["render",d],["__file","内网渗透基础知识.html.vue"]]),u=JSON.parse('{"path":"/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/%E5%86%85%E7%BD%91%E4%BD%93%E7%B3%BB%E5%BB%BA%E8%AE%BE/%E5%86%85%E7%BD%91%E6%B8%97%E9%80%8F%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html","title":"内网渗透基础知识","lang":"zh-CN","frontmatter":{"title":"内网渗透基础知识","date":"2023-09-03T07:29:52.000Z","updated":"2023-08-21T12:22:14.000Z","categories":["渗透测试","内网体系建设"],"description":"内网工作环境 工作组(work group) 工作组作为资源管理模式的一种，用于对计算机行使功能进行划分，每个工作组中有若干计算机。 注意: 1.将计算机加入工作组中时，若指定的工作组不存在，则会创建一个新的工作组 2.在默认情况下，局域网内的计算机都是采用工作组的方式进行资源管理，即处在名为WORKGROUP的工作组中 域 域同样时资源管理模式的一种...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/%E6%B8%97%E9%80%8F%E6%B5%8B%E8%AF%95/%E5%86%85%E7%BD%91%E4%BD%93%E7%B3%BB%E5%BB%BA%E8%AE%BE/%E5%86%85%E7%BD%91%E6%B8%97%E9%80%8F%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"内网渗透基础知识"}],["meta",{"property":"og:description","content":"内网工作环境 工作组(work group) 工作组作为资源管理模式的一种，用于对计算机行使功能进行划分，每个工作组中有若干计算机。 注意: 1.将计算机加入工作组中时，若指定的工作组不存在，则会创建一个新的工作组 2.在默认情况下，局域网内的计算机都是采用工作组的方式进行资源管理，即处在名为WORKGROUP的工作组中 域 域同样时资源管理模式的一种..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:published_time","content":"2023-09-03T07:29:52.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"内网渗透基础知识\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-09-03T07:29:52.000Z\\",\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"内网工作环境","slug":"内网工作环境","link":"#内网工作环境","children":[{"level":3,"title":"工作组(work group)","slug":"工作组-work-group","link":"#工作组-work-group","children":[]},{"level":3,"title":"域","slug":"域","link":"#域","children":[]}]},{"level":2,"title":"活动目录(Active Directory,AD)","slug":"活动目录-active-directory-ad","link":"#活动目录-active-directory-ad","children":[{"level":3,"title":"Ntds.dit文件","slug":"ntds-dit文件","link":"#ntds-dit文件","children":[]},{"level":3,"title":"目录服务与LDAP","slug":"目录服务与ldap","link":"#目录服务与ldap","children":[]},{"level":3,"title":"活动目录分区","slug":"活动目录分区","link":"#活动目录分区","children":[]},{"level":3,"title":"活动目录的查询","slug":"活动目录的查询","link":"#活动目录的查询","children":[]}]},{"level":2,"title":"域用户与机器用户","slug":"域用户与机器用户","link":"#域用户与机器用户","children":[{"level":3,"title":"域用户","slug":"域用户","link":"#域用户","children":[]},{"level":3,"title":"机器用户","slug":"机器用户","link":"#机器用户","children":[]}]},{"level":2,"title":"域用户组的分类和权限","slug":"域用户组的分类和权限","link":"#域用户组的分类和权限","children":[{"level":3,"title":"安全组权限","slug":"安全组权限","link":"#安全组权限","children":[]}]},{"level":2,"title":"组织单位","slug":"组织单位","link":"#组织单位","children":[]},{"level":2,"title":"访问控制","slug":"访问控制","link":"#访问控制","children":[{"level":3,"title":"windows访问控制模型","slug":"windows访问控制模型","link":"#windows访问控制模型","children":[]},{"level":3,"title":"访问控制列表(ACL)","slug":"访问控制列表-acl","link":"#访问控制列表-acl","children":[]}]},{"level":2,"title":"组策略","slug":"组策略","link":"#组策略","children":[{"level":3,"title":"组策略对象(GPO)","slug":"组策略对象-gpo","link":"#组策略对象-gpo","children":[]}]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":11.55,"words":3464},"filePathRelative":"渗透测试/内网体系建设/内网渗透基础知识.md","localizedDate":"2023年9月3日","excerpt":"<h2>内网工作环境</h2>\\n<h3>工作组(work group)</h3>\\n<p>工作组作为资源管理模式的一种，用于对计算机行使功能进行划分，每个工作组中有若干计算机。</p>\\n<p>注意:</p>\\n<p>1.将计算机加入工作组中时，若指定的工作组不存在，则会创建一个新的工作组</p>\\n<p>2.在默认情况下，局域网内的计算机都是采用工作组的方式进行资源管理，即处在名为WORKGROUP的工作组中</p>\\n<h3>域</h3>\\n<p>域同样时资源管理模式的一种，相比于工作组这种小型的管理模式，域更适合大型的计算机网络管理，域中的所有计算机，用户账户等等，都需要通过域控机器进行统一的身份验证，通过验证的用户能够访问什么资源，有什么权限取决去用户在域中的身份，域管理员用户无疑是权限最高的用户，所以通常进行内网渗透的最终目标就是拿下域管机器</p>","autoDesc":true}');export{o as comp,u as data};
