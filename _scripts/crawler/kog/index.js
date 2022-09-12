const Crawler = require("crawler");
const { readFileSync, writeFileSync, readdirSync } = require('fs');

const config = {
  source: 'https://pvp.qq.com/web201605/js/herolist.json',
  target: './herolist.json',
  imgFolder: './img'
}

const c = new Crawler({
  maxConnections: 1,
  // This will be called for each crawled page
  callback: (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      // console.log(res);
    }
    done();
  },
});

c.queue({
  uri: "https://pvp.qq.com/web201605/js/herolist.json",
  jquery: false,
  callback: (error, response, done) => {
    if (error) {
        console.error(error);
        return done();
    }

    writeFileSync(config.target, JSON.stringify(JSON.parse(response.body), null, 2));
    return done();
}
});
