<script>
      let props = {};
    function fetchAPICall() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        props = json;
        console.log(props);
      })  
      .catch(error => console.error(error));
      
    }
</script>

<div>
    <button class="btn btn-primary" on:click={fetchAPICall} >Get Fake WebAPI Data</button>
    {#if Object.keys(props).length > 0}
    <h1>User ID: {props.userId}</h1>
    <h2>Title: {props.title}</h2>
    <p>Completed: {props.completed ? 'Yes' : 'No'}</p>
    {/if}
</div>