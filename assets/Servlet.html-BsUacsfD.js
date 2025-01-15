import{_ as i}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as t,o as a}from"./app-DS0ZCcmM.js";const n={};function l(p,s){return a(),e("div",null,s[0]||(s[0]=[t(`<h1 id="servlet" tabindex="-1"><a class="header-anchor" href="#servlet"><span>Servlet</span></a></h1><blockquote><p>本篇旨在从0开始进入javaweb章节，记录一下学习的过程</p></blockquote><p>在进入Servelet之前，我们首先要先学会如何构建一个web项目</p><h2 id="构建web项目" tabindex="-1"><a class="header-anchor" href="#构建web项目"><span>构建web项目</span></a></h2><p>打开idea，新建项目中选择</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240618214345253.png" alt="image-20240618214345253" tabindex="0" loading="lazy"><figcaption>image-20240618214345253</figcaption></figure><p>可自行添加tomcat等应用程序的服务器，这里入门暂时可以不用考虑</p><h2 id="servlet入门" tabindex="-1"><a class="header-anchor" href="#servlet入门"><span>Servlet入门</span></a></h2><p>要实现一个http服务，我们通常需要处理较多的事件，工作量过大</p><p>JavaEE提供了Servlet API，我们使用Servlet API编写自己的Servlet来处理HTTP请求，Web服务器实现Servlet API接口，实现底层功能：</p><div class="language-ascii line-numbers-mode" data-highlighter="shiki" data-ext="ascii" data-title="ascii" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>                 ┌───────────┐</span></span>
<span class="line"><span>                 │My Servlet │</span></span>
<span class="line"><span>                 ├───────────┤</span></span>
<span class="line"><span>                 │Servlet API│</span></span>
<span class="line"><span>┌───────┐  HTTP  ├───────────┤</span></span>
<span class="line"><span>│Browser│&lt;──────&gt;│Web Server │</span></span>
<span class="line"><span>└───────┘        └───────────┘</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> org.example.java_web</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.io.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> jakarta.servlet.http.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> jakarta.servlet.annotation.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//定义访问地址</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">WebServlet</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;helloServlet&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> value</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/hello-servlet&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HelloServlet</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> extends</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> HttpServlet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    protected</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> doGet</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpServletRequest</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpServletResponse</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> IOException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">        doPost</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(request, response);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    protected</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> doPost</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpServletRequest</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">HttpServletResponse</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> IOException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">        PrintWriter</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> out</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> response</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;Hello World~&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">flush</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">        out</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个Servlet总是继承自<code>HttpServlet</code>，然后覆写<code>doGet()</code>或<code>doPost()</code>方法。注意到<code>doGet()</code>方法传入了<code>HttpServletRequest</code>和<code>HttpServletResponse</code>两个对象，分别代表HTTP请求和响应。我们使用Servlet API时，并不直接与底层TCP交互，也不需要解析HTTP协议，因为<code>HttpServletRequest</code>和<code>HttpServletResponse</code>就已经封装好了请求和响应。以发送响应为例，我们只需要设置正确的响应类型，然后获取<code>PrintWriter</code>，写入响应即可。</p><blockquote><p>这里需要注意你的tomcat版本和servlert依赖版本问题，要兼容才能调用</p></blockquote><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619151458453.png" alt="image-20240619151458453" tabindex="0" loading="lazy"><figcaption>image-20240619151458453</figcaption></figure><p>从代码来看，我们这里是基于注解的方式进行访问，还有基于web.xml的方式进行访问，比较繁琐，需要手动添加定义，这里不做介绍</p><h3 id="request-response" tabindex="-1"><a class="header-anchor" href="#request-response"><span>Request &amp; Response</span></a></h3><p>在<code>B/S架构</code>中最重要的就是浏览器和服务器端交互，<code>Java EE</code>将其封装为<code>请求</code>和<code>响应对象</code>，即 <code>request(HttpServletRequest)</code> 和 <code>response(HttpServletResponse)</code>，一个负责处理请求，一个负责响应请求</p><p>HttpServletRequest常用方法</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>getParameter(String name)</td><td>获取请求中的参数，该参数是由name指定的</td></tr><tr><td>getParameterValues(String name)</td><td>返回请求中的参数值，该参数值是由name指定的</td></tr><tr><td>getRealPath(String path)</td><td>获取Web资源目录</td></tr><tr><td>getAttribute(String name)</td><td>返回name指定的属性值</td></tr><tr><td>getAttributeNames()</td><td>返回当前请求的所有属性的名字集合</td></tr><tr><td>getCookies()</td><td>返回客户端发送的Cookie</td></tr><tr><td>getSession()</td><td>获取session回话对象</td></tr><tr><td>getInputStream()</td><td>获取请求主题的输入流</td></tr><tr><td>getReader()</td><td>获取请求主体的数据流</td></tr><tr><td>getMethod()</td><td>获取发送请求的方式，如GET、POST</td></tr><tr><td>getParameterNames()</td><td>获取请求中所有参数的名称</td></tr><tr><td>getRemoteAddr()</td><td>获取客户端的IP地址</td></tr><tr><td>getRemoteHost()</td><td>获取客户端名称</td></tr><tr><td>getServerPath()</td><td>获取请求的文件的路径</td></tr></tbody></table><p>HttpServletResponse常用方法</p><table><thead><tr><th>方法</th><th>说明</th></tr></thead><tbody><tr><td>getWriter()</td><td>获取响应打印流对象</td></tr><tr><td>getOutputStream()</td><td>获取响应流对象</td></tr><tr><td>addCookie(Cookie cookie)</td><td>将指定的Cookie加入到当前的响应中</td></tr><tr><td>addHeader(String name,String value)</td><td>将指定的名字和值加入到响应的头信息中</td></tr><tr><td>sendError(int sc)</td><td>使用指定状态码发送一个错误到客户端</td></tr><tr><td>sendRedirect(String location)</td><td>发送一个临时的响应到客户端</td></tr><tr><td>setDateHeader(String name,long date)</td><td>将给出的名字和日期设置响应的头部</td></tr><tr><td>setHeader(String name,String value)</td><td>将给出的名字和值设置响应的头部</td></tr><tr><td>setStatus(int sc)</td><td>给当前响应设置状态码</td></tr><tr><td>setContentType(String ContentType)</td><td>设置响应的MIME类型</td></tr></tbody></table><h2 id="servlet进阶" tabindex="-1"><a class="header-anchor" href="#servlet进阶"><span><a href="https://www.liaoxuefeng.com/wiki/1252599548343744/1328761739935778" target="_blank" rel="noopener noreferrer">Servlet进阶</a></span></a></h2><p>这部分主要是开发的知识，可以看一下</p><h3 id="cookie和session" tabindex="-1"><a class="header-anchor" href="#cookie和session"><span><a href="https://www.javasec.org/javaweb/Cookie&amp;Session/" target="_blank" rel="noopener noreferrer">Cookie和Session</a></span></a></h3><p><code>Cookie</code> 是最常用的Http会话跟踪机制，且所有<code>Servlet容器</code>都应该支持。当客户端不接受<code>Cookie</code>时，服务端可使用<code>URL重写</code>的方式作为会话跟踪方式。会话<code>ID</code>必须被编码为URL字符串中的一个路径参数，参数的名字必须是 <code>jsessionid</code>。</p><p>浏览器和服务端创建会话(<code>Session</code>)后，服务端将生成一个唯一的会话ID(<code>sessionid</code>)用于标识用户身份，然后会将这个会话ID通过<code>Cookie</code>的形式返回给浏览器，浏览器接受到<code>Cookie</code>后会在每次请求后端服务的时候带上服务端设置<code>Cookie</code>值，服务端通过读取浏览器的<code>Cookie</code>信息就可以获取到用于标识用户身份的会话ID，从而实现会话跟踪和用户身份识别。</p><h2 id="jsp" tabindex="-1"><a class="header-anchor" href="#jsp"><span>JSP</span></a></h2><p>类似于.php这样的脚本语言，可以在.jsp文件中直接调用java代码来实现后端逻辑，摆脱了传统的servlet处理流程</p><p>整个JSP的内容实际上是一个HTML，但是稍有不同：</p><ul><li>包含在<code>&lt;%--</code>和<code>--%&gt;</code>之间的是JSP的注释，它们会被完全忽略；</li><li>包含在<code>&lt;%</code>和<code>%&gt;</code>之间的是Java代码，可以编写任意Java代码；</li><li>如果使用<code>&lt;%= xxx %&gt;</code>则可以快捷输出一个变量的值。</li></ul><h3 id="三大指令" tabindex="-1"><a class="header-anchor" href="#三大指令"><span>三大指令</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;%@ page ... %&gt; 定义网页依赖属性，比如脚本语言、error页面、缓存需求等等</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;%@ include ... %&gt; 包含其他文件（静态包含）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;%@ taglib prefix=&quot;c&quot; uri=&quot;http://java.sun.com/jsp/jstl/core&quot; %&gt; 引入标签库的定义</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="九大对象" tabindex="-1"><a class="header-anchor" href="#九大对象"><span>九大对象</span></a></h3><p>从本质上说 JSP 就是一个Servlet，JSP 引擎在调用 JSP 对应的 jspServlet 时，会传递或创建 9 个与 web 开发相关的对象供 jspServlet 使用。 JSP 技术的设计者为便于开发人员在编写 JSP 页面时获得这些 web 对象的引用，特意定义了 9 个相应的变量，开发人员在JSP页面中通过这些变量就可以快速获得这 9 大对象的引用。</p><p>如下：</p><table><thead><tr><th>变量名</th><th>类型</th><th>作用</th></tr></thead><tbody><tr><td>pageContext</td><td>PageContext</td><td>当前页面共享数据，还可以获取其他8个内置对象</td></tr><tr><td>request</td><td>HttpServletRequest</td><td>客户端请求对象，包含了所有客户端请求信息</td></tr><tr><td>session</td><td>HttpSession</td><td>请求会话</td></tr><tr><td>application</td><td>ServletContext</td><td>全局对象，所有用户间共享数据</td></tr><tr><td>response</td><td>HttpServletResponse</td><td>响应对象，主要用于服务器端设置响应信息</td></tr><tr><td>page</td><td>Object</td><td>当前Servlet对象,<code>this</code></td></tr><tr><td>out</td><td>JspWriter</td><td>输出对象，数据输出到页面上</td></tr><tr><td>config</td><td>ServletConfig</td><td>Servlet的配置对象</td></tr><tr><td>exception</td><td>Throwable</td><td>异常对象</td></tr></tbody></table><h3 id="jsp和servlet的关系" tabindex="-1"><a class="header-anchor" href="#jsp和servlet的关系"><span>jsp和servlet的关系</span></a></h3><p>两者并没有任何区别，JSP在执行前首先被编译成一个Servlet，只不过无需配置映射路径，Web Server会根据路径查找对应的<code>.jsp</code>文件，如果找到了，就自动编译成Servlet再执行</p><div class="language-jsp line-numbers-mode" data-highlighter="shiki" data-ext="jsp" data-title="jsp" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;html&gt;</span></span>
<span class="line"><span>&lt;head&gt;</span></span>
<span class="line"><span>    &lt;title&gt;Hello World - JSP&lt;/title&gt;</span></span>
<span class="line"><span>&lt;/head&gt;</span></span>
<span class="line"><span>&lt;body&gt;</span></span>
<span class="line"><span>    &lt;%-- JSP Comment --%&gt;</span></span>
<span class="line"><span>    &lt;h1&gt;Hello World!&lt;/h1&gt;</span></span>
<span class="line"><span>    &lt;p&gt;</span></span>
<span class="line"><span>    &lt;%</span></span>
<span class="line"><span>         out.println(&quot;Your IP address is &quot;);</span></span>
<span class="line"><span>    %&gt;</span></span>
<span class="line"><span>    &lt;span style=&quot;color:red&quot;&gt;</span></span>
<span class="line"><span>        &lt;%= request.getRemoteAddr() %&gt;</span></span>
<span class="line"><span>    &lt;/span&gt;</span></span>
<span class="line"><span>    &lt;/p&gt;</span></span>
<span class="line"><span>&lt;/body&gt;</span></span>
<span class="line"><span>&lt;/html&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一个简单的jsp示例</p><h2 id="filter" tabindex="-1"><a class="header-anchor" href="#filter"><span>Filter</span></a></h2><p>javax.servlet.Filter，servlet2.3之后新的特性，主要用于过滤URL请求，通过Filter我们可以实现URL请求资源权限验证、用户登陆检测等功能</p><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619221957747.png" alt="image-20240619221957747" tabindex="0" loading="lazy"><figcaption>image-20240619221957747</figcaption></figure><p>我们需要重写这三个方法(事实上只要求重写doFilter方法)</p><div class="language-java line-numbers-mode" data-highlighter="shiki" data-ext="java" data-title="java" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">package</span><span style="--shiki-light:#383A42;--shiki-dark:#C678DD;"> org.example.javaweb</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> javax.servlet.</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">*</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> javax.servlet.annotation.WebFilter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.io.IOException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">import</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> java.io.PrintWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">@</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">WebFilter</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">filterName</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;TestFilter&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">value</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> &quot;/*&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">)</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> class</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> TestFilter</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> implements</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> Filter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    @</span><span style="--shiki-light:#A626A4;--shiki-dark:#E5C07B;">Override</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    public</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> void</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> doFilter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ServletRequest</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> servletRequest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">ServletResponse</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> servletResponse</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">FilterChain</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;"> filterChain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> throws</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> IOException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;"> ServletException</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> {</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">        String</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> pwd</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> servletRequest</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getParameter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;pwd&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">        if</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> (</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;114&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">equals</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(pwd)){</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            //传递给下一条filter链使用</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            filterChain</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">doFilter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(servletRequest,servletResponse);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">else</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">{</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">            //输出错误信息</span></span>
<span class="line"><span style="--shiki-light:#C18401;--shiki-dark:#E5C07B;">            PrintWriter</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;"> printWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;"> servletResponse</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            printWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">println</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;pwd error&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            printWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">flush</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E5C07B;">            printWriter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">close</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619222914979.png" alt="image-20240619222914979" tabindex="0" loading="lazy"><figcaption>image-20240619222914979</figcaption></figure><h3 id="servlet和filter的关系" tabindex="-1"><a class="header-anchor" href="#servlet和filter的关系"><span>Servlet和Filter的关系</span></a></h3><p>两者都通过注释或者web.xml来定义，都可以处理http请求，<code>Filter</code>和<code>Servlet</code>虽然概念上不太一样，但都可以处理Http请求，都可以用来实现MVC控制器</p><p>这里概括一下不同点</p><p>Filter更偏向于实现对Java Web请求资源的拦截过滤，针对一些攻击行为的禁止</p><p>Servlet主要做后端的业务逻辑处理</p><blockquote><p>代码审计的重点是Servlet的逻辑问题以及Filter的过滤问题，是否完备</p></blockquote>`,53)]))}const d=i(n,[["render",l],["__file","Servlet.html.vue"]]),k=JSON.parse('{"path":"/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Servlet.html","title":"Servlet","lang":"zh-CN","frontmatter":{"description":"Servlet 本篇旨在从0开始进入javaweb章节，记录一下学习的过程 在进入Servelet之前，我们首先要先学会如何构建一个web项目 构建web项目 打开idea，新建项目中选择 image-20240618214345253image-20240618214345253 可自行添加tomcat等应用程序的服务器，这里入门暂时可以不用考虑 S...","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/articles/Java%E5%AD%A6%E4%B9%A0/%E5%86%85%E5%AD%98%E9%A9%AC/Servlet.html"}],["meta",{"property":"og:site_name","content":"uu2fu3o的知识库"}],["meta",{"property":"og:title","content":"Servlet"}],["meta",{"property":"og:description","content":"Servlet 本篇旨在从0开始进入javaweb章节，记录一下学习的过程 在进入Servelet之前，我们首先要先学会如何构建一个web项目 构建web项目 打开idea，新建项目中选择 image-20240618214345253image-20240618214345253 可自行添加tomcat等应用程序的服务器，这里入门暂时可以不用考虑 S..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240618214345253.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-01-15T18:41:02.000Z"}],["meta",{"property":"article:modified_time","content":"2025-01-15T18:41:02.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Servlet\\",\\"image\\":[\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240618214345253.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619151458453.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619221957747.png\\",\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240619222914979.png\\"],\\"dateModified\\":\\"2025-01-15T18:41:02.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"uu2fu3o\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[{"level":2,"title":"构建web项目","slug":"构建web项目","link":"#构建web项目","children":[]},{"level":2,"title":"Servlet入门","slug":"servlet入门","link":"#servlet入门","children":[{"level":3,"title":"Request & Response","slug":"request-response","link":"#request-response","children":[]}]},{"level":2,"title":"Servlet进阶","slug":"servlet进阶","link":"#servlet进阶","children":[{"level":3,"title":"Cookie和Session","slug":"cookie和session","link":"#cookie和session","children":[]}]},{"level":2,"title":"JSP","slug":"jsp","link":"#jsp","children":[{"level":3,"title":"三大指令","slug":"三大指令","link":"#三大指令","children":[]},{"level":3,"title":"九大对象","slug":"九大对象","link":"#九大对象","children":[]},{"level":3,"title":"jsp和servlet的关系","slug":"jsp和servlet的关系","link":"#jsp和servlet的关系","children":[]}]},{"level":2,"title":"Filter","slug":"filter","link":"#filter","children":[{"level":3,"title":"Servlet和Filter的关系","slug":"servlet和filter的关系","link":"#servlet和filter的关系","children":[]}]}],"git":{"createdTime":1736966462000,"updatedTime":1736966462000,"contributors":[{"name":"uu2fu3o","username":"uu2fu3o","email":"1027578439@qq.com","commits":1,"url":"https://github.com/uu2fu3o"}]},"readingTime":{"minutes":6.38,"words":1915},"filePathRelative":"Java学习/内存马/Servlet.md","localizedDate":"2025年1月16日","excerpt":"\\n<blockquote>\\n<p>本篇旨在从0开始进入javaweb章节，记录一下学习的过程</p>\\n</blockquote>\\n<p>在进入Servelet之前，我们首先要先学会如何构建一个web项目</p>\\n<h2>构建web项目</h2>\\n<p>打开idea，新建项目中选择</p>\\n<figure><img src=\\"https://raw.githubusercontent.com/uu2fu3o/blog-picture/master/cloud/image-20240618214345253.png\\" alt=\\"image-20240618214345253\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20240618214345253</figcaption></figure>","autoDesc":true}');export{d as comp,k as data};
