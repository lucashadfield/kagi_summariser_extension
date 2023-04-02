const POST_URL = 'https://labs.kagi.com/v1/summarization';
const STATUS_URL = 'https://labs.kagi.com/v1/summary_status';


async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

async function checkStatus(statusUrl, pageUrl) {
  const response = await fetch(`${statusUrl}?url=${encodeURIComponent(pageUrl)}&stream=0&target_language=&engine=agnes`);
  return response.json();
}

async function getPage() {
  const tabs = await browser.tabs.query({currentWindow: true, active: true});
  return tabs[0].url;
}

async function fetchSummary(postUrl, statusUrl) {
  const pageUrl = await getPage();

  // try status url in case it's already been summarised
  let response = await checkStatus(statusUrl, pageUrl);
  if (response.status == 'completed') {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('summary').style.display = 'block';
    document.getElementById('summary').innerHTML = response.summary;
    return;
  }

  // otherwise, post to summarization url
  const data = {
    url: pageUrl,
  };

  document.getElementById('loading').style.display = 'flex';
  document.getElementById('summary').style.display = 'none';

  await postData(postUrl, data);

  for (let i = 0; i < 30; i++) {
    response = await checkStatus(statusUrl, pageUrl);

    if (response.status == 'completed') {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('summary').style.display = 'block';
      document.getElementById('summary').innerHTML = response.summary;
      return;
    }

//    document.getElementById('status').innerHTML = response.status;
    await new Promise(r => setTimeout(r, 1000));
  }
}

window.onload = function() {
  console.log('running script')
  fetchSummary(POST_URL, STATUS_URL);
};
