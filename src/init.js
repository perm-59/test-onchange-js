// @ts-check


import onChange, { target } from 'on-change';

export default () => {
  let data;
  let rows;
  let watchedObject;
  const request = new XMLHttpRequest();
  request.open('GET', '/src/assets/adsress_url_api.json');

  request.addEventListener("readystatechange", () => {

    
    if (request.readyState === 4 && request.status === 200) {
      data = request.responseText;
    }
    if (data) {
      rows = JSON.parse(data)

      const ulElem = document.querySelector('#parent');
      rows = JSON.parse(data);
      watchedObject = onChange( rows, (path, value) =>  changeData(path, value));
      
      rows.forEach(element => {
        const elem = document.createElement('li');
        elem.innerHTML = element.url;
        ulElem.append(elem)
      });
      watchedObject.rows = rows;
    }
  });

  const changeData = (path, value) =>  {
    const ulElem = document.querySelector('#parent');
    ulElem.innerHTML = '';
    value.forEach(element => {
      const elem = document.createElement('li');
      elem.innerHTML = element.url;
      ulElem.append(elem)
    });
    
  }
  
  
  request.send();
  
  addEventListener('click', (event) => {
    if (event.target.type === "submit") {
      const addData = document.getElementById('newData');
      if (addData && addData.value && addData.value.trim().length > 0 && addData.validity.valid) {
        if (!rows.some((row) => row.url === addData.value)) {
          const max = +(getMaxValue(rows))+ 1;
          const newAddress = {id: max, url: addData.value};
          const elems = document.getElementById('newData');
          
          watchedObject.rows.push(newAddress);
          /** чтоб не показывалось сообщение валидации */
          setTimeout(() => {
            elems.value = ''
          })
          
        }
        
      }
    }
  })
  
};



// получение максимального элемента массива
function getMaxValue(array){
  var max = array[0].id; // берем первый элемент массива
  for (var i = 0; i < array.length; i++) { // переберем весь массив
      // если элемент больше, чем в переменной, то присваиваем его значение переменной
      if (max < array[i].id) max = array[i].id; 
  }
  // возвращаем максимальное значение
  return max;
}
