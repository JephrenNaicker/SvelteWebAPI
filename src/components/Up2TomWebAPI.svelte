
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">

<!-- <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"> -->
<script>
    import { each } from "svelte/internal";
    //import db from '../db/sqlite.js';
    
    
    
//     const dbdata = {
//   attributes: {
//     input: [
//       "-10",
//       "Female",
//       50,
//       "No",
//       "Afternoon",
//       "No",
//       "No",
//       10,
//       9
//     ],
//     decision: "Espresso",
//     meets_confidence: false,
//     model: "58d3bcf97c6b1644db73ad12",
//     timestamp: "2023-04-24T17:59:42Z",
//     confidence: 0.30920570106910433
//   }
// };

// function SaveTestData(){

// db.run(`INSERT INTO decision (input, decision, meets_confidence, model, timestamp, confidence) 
//         VALUES (?, ?, ?, ?, ?, ?)`,
//   JSON.stringify(dbdata.attributes.input),
//   dbdata.attributes.decision,
//   dbdata.attributes.meets_confidence ? 1 : 0,
//   dbdata.attributes.model,
//   dbdata.attributes.timestamp,
//   dbdata.attributes.confidence
// );

// db.all('SELECT * FROM decision', (error, rows) => {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   console.log(rows);
// });

//}






let isDisable = false;
let isConnected = '';
let showFrom = true;
let showResults= false;
let GetModels = [];
let GetAmodel = {};
let GetDecision = {};

let Temperature = '';
let Age= '';
let per_day = '';
let consumed_today = '';

let selectedGender ='';
const genderOption = ['Male','Female'];

let selectedCaffeine ='';
const CaffeineOption = ['Yes','No','Not Sure'];

let selectedDaytime ='';
const DayTimeOption = ['Morning','Afternoon','Evening'];

let selectedPregnant='';
const PregnantOption = ['Yes','No','NA'];

let selectedHeath = '';
const HealthOption = ['Yes','No'];

let result = null

let formIsValid = false;

let error = {Temperature:'', selectedGender :'', Age:'',selectedCaffeine:'',selectedDaytime:'',selectedPregnant:'',selectedHeath:'',per_day:'',consumed_today:''};


function validateForm()   {
    if (Temperature === '') 
    {
      formIsValid = false;
      error.Temperature ="Please add Temperature from (-10 to 45)";
     
    }else{
      error.Temperature ="";
    }
    if(selectedGender === '' )
    {
      formIsValid = false;
      error.selectedGender ="Please Select 'Male' or 'Female'";
    }
    else{
      error.selectedGender ="";
    }
    
    if(Age === '')
    {
      formIsValid = false;
      error.Age ="Please add Age from 1 to 99";
    } 
    else{
      error.Age ="";
    }
    
    if(selectedCaffeine === '' )
    {
      formIsValid = false;
      error.selectedCaffeine ="Please Select the Caffeine Option";
    }else{
      error.selectedCaffeine ="";
    }
    if( selectedDaytime === '')
    {
      formIsValid = false;
      error.selectedDaytime ="Please Select the Day of Time Option";
    }else{
      error.selectedDaytime ="";
    }
    if(selectedPregnant === '')
    {
      formIsValid = false;
      error.selectedPregnant ="Please Select the Pregnant Option";
    } else{
      error.selectedPregnant ="";
    }


    if(selectedHeath === '' )
    {
      formIsValid = false;
      error.selectedHeath ="Please Select the Health conscious Option ";
    }else{
      error.selectedHeath ="";
    }
    
    if(per_day === '' )
    {
      formIsValid = false;
      error.per_day ="Please add number of drinks per a day";
    }else{
      error.per_day ="";
    }
    
    if(consumed_today === '') 
    {
      formIsValid = false;
      error.consumed_today ="Please add number of drinks consumed today";
    }
    else{
      error.consumed_today ="";
    }

    if(per_day <=consumed_today  )
    {
      formIsValid = false;
      error.consumed_today ="drinks consumed today must be less or equal to per day";
      error.per_day ="drinks per a day can must be less or equal to drinks consumed today";
    }
    else{
      error.per_day ="";
      error.consumed_today ="";
    }

    formIsValid = true;
  }

function fetchModels() {
  const apiKey = '9307bfd5fa011428ff198bb37547f979';
  const modelId = '58d3bcf97c6b1644db73ad12';
  const url = `https://api.up2tom.com/v3/models/`;

  fetch(url,{
    headers: {
     'Authorization'   : `Token ${apiKey}`
    }
  })
    .then(response => response.json())
    .then(data => {
      GetModels=data.data;
        console.log(GetModels);})
    .catch(error => {console.error(error);
      isConnected='Unable to connect Please check Internet Connection';});
}

function fetchAModel() {
  const apiKey = '9307bfd5fa011428ff198bb37547f979';
  const modelId = '58d3bcf97c6b1644db73ad12';
  const url = `https://api.up2tom.com/v3/models/${modelId}`;

  fetch(url,{
    headers: {
     'Authorization'   : `Token ${apiKey}`
    }
  })
    .then(response => response.json())
    .then(data => {
      GetAmodel=data.data;
        console.log(GetAmodel);})
    .catch(error => {console.error(error);
      isConnected='Unable to connect Please check Internet Connection';});
}


function fetchAPICall() {
  validateForm();

if(formIsValid)
{

  const apiKey = '9307bfd5fa011428ff198bb37547f979';
  const modelId = '58d3bcf97c6b1644db73ad12';
  const url = `https://api.up2tom.com/v3/decision/${modelId}`
  const inputData = [Temperature, selectedGender, Age, selectedCaffeine, selectedDaytime, selectedPregnant, selectedHeath, per_day, consumed_today];
  console.log(inputData);
  const postData = {
    data: {
      type: 'scenario',
      attributes: {
        input: inputData
      }
    }
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(postData)
  };
  fetch(url, options)
    .then(response => response.json())
    .then(json => {
      GetDecision=json.data;
      console.log(GetDecision);})
    .catch(error => {console.error(error);
      isConnected='Unable to connect Please check Internet Connection';});
  }
  showFrom = false;
}

function handleGenderSelection(event) {
    selectedGender = event.target.value;
    if(selectedGender==="Male")
    {
      selectedPregnant = 'NA';
      isDisable = true;
    }
    else if(selectedGender==="Female")
    {
      selectedPregnant = 'No';
      isDisable = true;
    }
    else {
      selectedPregnant = '';
    }
  }

  window.addEventListener('load', fetchAModel);
</script>

<main>
  <div class="mx-auto w-full max-w-md">
    <!-- <button class="btn btn-primary" on:click={fetchAModel}>Fetch A Model</button> -->
    <h2>Description : {GetAmodel.attributes ? GetAmodel.attributes.description :''}</h2>
    {#if isConnected != ''}
       <p>{isConnected}</p>
    {/if}
  </div>
  <hr/>
<!--   
      <div>
        <button class="btn btn-primary" on:click={fetchModels}>Fetch Models</button>
      </div>
      <div class="card">
        {#each GetModels as item}   
        <h1>User ID: {item.type}</h1>
        <h2>Title: {item.id}</h2>
        <h2>Name: {item.attributes.name}</h2>
        <h2>description: {item.attributes.description}</h2>
        {/each}
        {#if isConnected != ''}
        <p>{isConnected}</p>
        {/if}
      </div> -->


      <div class="mx-auto w-full max-w-md">
        <form class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" on:submit|preventDefault={fetchAPICall}>
          <h2 class="text-2xl font-bold text-center mb-4">Enter Your Information</h2>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="temperature">
              Temperature
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="temperature" type="number" bind:value={Temperature} min="-10" max="45" placeholder="Enter your temperature">
            
                <span class="text-sm text-red-500" role="alert">
                      <strong> {error.Temperature}</strong>
                </span>
            
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="gender">
              Gender
            </label>
            <div class="mt-2">
              {#each genderOption as gender}
              <label class="inline-flex items-center ml-6" >
                <input type="radio" class="form-radio" name="gender" bind:group={selectedGender} value={gender} on:change={handleGenderSelection} />
                <span class="ml-2">{gender}</span>
              </label>
              {/each}
             
            </div>
            <span class="text-sm text-red-500" role="alert">
              <strong> {error.selectedGender}</strong>
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="age">
              Age
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="age" type="number" bind:value={Age}  min="1" max="90"placeholder="Enter your age">
            <span class="text-sm text-red-500" role="alert">
              <strong> {error.Age}</strong>
            </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="caffeine">
              Sensitive to Caffeine?
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="caffeine" name="caffeine" bind:value={selectedCaffeine}>
              <option value="">Select sensitive to caffeine</option>           
              {#each CaffeineOption as Caffeine }
              <option  value = {Caffeine} >{Caffeine}</option>         
              {/each}         
            </select>
            <span class="text-sm text-red-500" role="alert">
              <strong> {error.selectedCaffeine}</strong>
        </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="daytime">
              Daytime
            </label>
            <select
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="daytime" name="daytime"  bind:value={selectedDaytime}>
              <option value="">Select time of day</option>
              {#each DayTimeOption as Day }
                  <option  value = {Day} >{Day}</option>   
               {/each}
            </select>
            <span class="text-sm text-red-500" role="alert">
              <strong> {error.selectedDaytime}</strong>
        </span>
          </div>
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2" for="pregnant">
              Pregnant
            </label>
              <div class="mt-2">
                {#each PregnantOption as Pregnant }
                <label class="inline-flex items-center ml-6">
                 <input type="radio" class="form-radio" name="Pregnant" bind:group={selectedPregnant} value= {Pregnant}  disabled={selectedGender === 'Male' || selectedGender === 'Female' && Pregnant === 'NA'}>
                   <span class="ml-2">{Pregnant}</span>
                </label>
               {/each}
              </div>
              <span class="text-sm text-red-500" role="alert">
                <strong> {error.selectedPregnant}</strong>
               </span>
            </div>

            <div class="mb-4">
              <label class="block text-gray-700 font-bold mb-2" for="pregnant">
                Health Conscious
              </label>
                <div class="mt-2">

                  {#each HealthOption as Health }
                  <label class="inline-flex items-center ml-6">
                    <input type="radio" name="Health"  class="form-radio" bind:group={selectedHeath} value={Health}  >
                    <span class="ml-2">{Health}</span>
                  </label>
                  {/each}
                
                </div>
                <span class="text-sm text-red-500" role="alert">
                  <strong> {error.selectedHeath}</strong>
               </span>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="per_day">
                  Number of drinks consumed per day
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="per_day" type="number" bind:value={per_day} min="0" max="20"placeholder="Enter drink consumed per day">
                <span class="text-sm text-red-500" role="alert">
                  <strong> {error.per_day}</strong>
                </span>
              </div>

              <div class="mb-4">
                <label class="block text-gray-700 font-bold mb-2" for="consumed_today">
                  Number of drinks consumed today
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="consumed_today" type="number"  bind:value={consumed_today} min="0" max="20"  placeholder="Enter drink consumed today">
                <span class="text-sm text-red-500" role="alert">
                  <strong> {error.consumed_today}</strong>
                 </span>
              </div>
              <button class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4">
                Submit
              </button>
        </form>
      </div>
      
   


<div class="mx-auto w-full max-w-md">
        <form class="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" >
  {#if GetDecision}
  <h2 class="text-2xl font-bold text-center mb-4">Drink  Decision</h2>
  <label class="block text-gray-700 font-bold mb-2" for="consumed_today">
    Decision: {GetDecision.attributes ? GetDecision.attributes.decision:''}
  </label>
  {/if}
</form>
</div>

</main>
