unirest.get("https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=get:exp:US&t=ns&st=adv&p=1")
.header("X-RapidAPI-Host", "unogs-unogs-v1.p.rapidapi.com")
.header("X-RapidAPI-Key", `${RICHARD_UNOGS_KEY}`)
.end(function (result) {
  console.log(result.status, result.headers, result.body);
});
