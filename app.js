document.getElementById('Translate').addEventListener('click', translateText);

function translateText(event) {
  event.preventDefault();

  const text = document.getElementById('textTranslate').value.trim();
  const targetLang = document.getElementById('target').value;

  if (!text) {
    document.getElementById('result').innerText = 'لطفاً متنی وارد کنید.';
    return;
  }

  document.getElementById('result').innerText ="Loding ...";


  fetch('https://libretranslate.com/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify({
      q: text,
      source: 'auto',
      target: targetLang,
      format: 'text'
    })
  })
    .then(res => {
      if (!res.ok) throw new Error("The request was invalid.");
      return res.json();
    })
    .then(data => {
      document.getElementById('result').innerText = data.translatedText;
      console.log('ترجمه:', data.translatedText);
      document.getElementById('result').style.color = 'black';
      document.getElementById('result').style.fontWeight = 'normal';
    })
    .catch(err => {
      console.error('خطا:', err);
      document.getElementById('result').innerText = 'Translation error.';
      document.getElementById('result').style.color = 'red';
      document.getElementById('result').style.fontWeight = 'bold';
    });
}
