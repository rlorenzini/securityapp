export default function replaceASCII(value) {

  return value.replace("&amp;","&").replace("&gt;",">").replace("&lt;","<").replace("&quot;",'"').replace("&#39;", "'").replace("&rsquo;","'")

}
