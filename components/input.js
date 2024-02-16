export const getInput = ({ type, labelTitle, callBack }) => {
  const input = document.createElement('input');
  const label = document.createElement('label');
  input.setAttribute('type', type);
  if(callBack){
    input.addEventListener('change', event => callBack(event.target.value));

  }

  label.innerText = labelTitle;
  label.append(input);

  return label;
};
