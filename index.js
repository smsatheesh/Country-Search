let nameOfCntry = document.getElementById( "countryName" );
let srchButton = document.getElementById( "srchButton" )
let clrButton = document.getElementById( "clrButton" );
let res = document.getElementById( "result" );
let favi = document.getElementById( "ico" );

srchButton.addEventListener( "click", async () => {

    let countryValue = nameOfCntry.value;
    console.log( countryValue );

    let finalURL = `https://restcountries.com/v3.1/name/${countryValue}`;
    console.log( finalURL );
    await fetch(finalURL)
        .then( (response) => response.json())
        .then( (data) => {
            
            console.log( data );

            if( data && data["length"] > 0 ) {

                let len = data["length"] - 1;
                if( 
                    data && data[len] 
                    && data[len]["name"] && data[len]["name"]["common"]
                    && data[len]["continents"]
                ) {

                    favi.removeAttribute( "href" );
                    res.innerHTML = '';
                    
                    res.innerHTML = `
                        <h2> <span id="header"> Continent :</span> <span id="value"> ${ data[len]["continents"] } </span> </h2>
                    `;
                    res.innerHTML += `
                        <h3> <span id="header"> Official Name : </span> <span id="value"> ${ data[len]["name"]["common"] } </span> </h3>
                    `;
                    res.innerHTML += `
                        <h4> <span id="header">Independent : </span> <span id="value"> ${ data[len]["independent"] } </span> </h4>
                    `;

                    res.innerHTML += `
                        <img id="flagHosting" src="${ data[len]['flags']['svg'] }" alt='Flag....' />
                    `;
                }

                if( data[len] && data[len]["flags"] && data[len]["flags"]["png"] )
                    favi.setAttribute( "href", `${ data[len]["flags"]["png"] }` );
            } else {
                throw new Error();
            }
        } )
        .catch( () => {
              
            res.innerHTML = "";
            if( countryValue.length == 0 )
                res.innerHTML = " <h3> <span id='header'> Input field cannot be empty </span></h3>";
            else
                res.innerHTML = " <h3> <span id='header'> Kindly, Enter valid country name </span></h3>";
        } );
} );

clrButton.addEventListener( "click", () => {

    nameOfCntry.value = '';
    favi.removeAttribute( "href" );
    res.innerHTML = '';
} );