    let datas = [];

    let data = {
        attr_1: undefined,
        attr_2: undefined,
        attr_3: undefined,
        attr_4: undefined
    };

    let html = {
        get(element){
            return document.querySelector(element)
        }
    }

    let state = {
        page: 1,
        perPage: 0,
        totalPage: 0,
        maxVisibleButtons: 5
    }

    const controls = {

        next(){
            state.page++;
            const lastPage = state.page > state.totalPage
            if(lastPage){
                state.page--;
            }
        },
        prev(){
            state.page--;
            if(state.page < 1){
                state.page++;
            }

        },
        goTo(page){

            if(page < 1){
                page = 1
            }

            state.page = +page;
            if(page > state.totalPage){
                state.page = state.totalPage;
            }

        },
        createListener(button, type){
            if(type=='next'){
                button.addEventListener('click', () => {
                    this.next();
                    update('', this.search())
                })
            }else if(type == 'prev'){
                button.addEventListener('click', () => {
                    this.prev();
                    update('', this.search())
                })
            }else if(type == 'first'){
                button.addEventListener('click', () => {
                    this.goTo(1);
                    update('', this.search())
                 })
            }else if(type == "last"){
                button.addEventListener('click', () => {
                    this.goTo(state.totalPage);
                    update('', this.search())
                 })
            }else{
                button.addEventListener('click', (event) => {
                    const page = event.target.innerText 
                    this.goTo(page)
                    update('', this.search())
                })
            }
        },
        createListeners(){
            this.verify('.s1',(b) =>{
                if(b === true){

                    html.get('.s1').addEventListener('click', () => {
                        let c = html.get('.s1 span').className;

                        if(c ==='fas fa-arrow-down'  || c === 'fas fa-arrows-alt-v'){
                            html.get('.s1 span').className = 'fas fa-arrow-up';
                            update('s1_up', this.search())
                        }else if(c === 'fas fa-arrow-up'){
                            html.get('.s1 span').className= 'fas fa-arrow-down';
                            update('s1_down', this.search())
                        }

                        html.get('.s2 span').className= 'fas fa-arrows-alt-v';
                        html.get('.s3 span').className= 'fas fa-arrows-alt-v';
                        if(html.get('.s4 span') != null){
                            html.get('.s4 span').className= 'fas fa-arrows-alt-v';
                        }                
                    })
                }
            }),
            this.verify('.s2',(b)=>{

                if(b != false){

                    html.get('.s2').addEventListener('click', () => {
                        let c = html.get('.s2 span').className;

                        if(c ==='fas fa-arrow-down' || c === 'fas fa-arrows-alt-v'){
                            html.get('.s2 span').className = 'fas fa-arrow-up';
                            update('s2_up', this.search())
                        }else if(c === 'fas fa-arrow-up'){
                            html.get('.s2 span').className= 'fas fa-arrow-down';
                            update('s2_down', this.search())
                        }
                    
                        html.get('.s1 span').className= 'fas fa-arrows-alt-v';
                        html.get('.s3 span').className= 'fas fa-arrows-alt-v';

                        if(html.get('.s4 span') != null){
                            html.get('.s4 span',).className= 'fas fa-arrows-alt-v';
                        }
                    })
                }
            }),
            this.verify('.s3',(b)=>{
                if(b != false){

                    html.get('.s3').addEventListener('click', () => {
                        let c = html.get('.s3 span').className;

                        if(c ==='fas fa-arrow-down' || c === 'fas fa-arrows-alt-v'){
                            html.get('.s3 span').className = 'fas fa-arrow-up';
                            update('s3_up', this.search())
                        }else if(c === 'fas fa-arrow-up'){
                            html.get('.s3 span').className= 'fas fa-arrow-down';
                            update('s3_down', this.search())
                        }

                        html.get('.s1 span').className= 'fas fa-arrows-alt-v';
                        html.get('.s2 span').className= 'fas fa-arrows-alt-v';
                        if(html.get('.s4 span') != null){
                            html.get('.s4 span').className= 'fas fa-arrows-alt-v';
                        }
                    })
                }
            }), 
            this.verify('.s4',(b)=>{
                if(b != false){
                    html.get('.s4').addEventListener('click', () => {
                        let c = html.get('.s4 span').className;
        
                        if(c ==='fas fa-arrow-down'  || c === 'fas fa-arrows-alt-v'){
                            html.get('.s4 span').className = 'fas fa-arrow-up';
                            update('s4_up', this.search())
                        }else if(c === 'fas fa-arrow-up'){
                            html.get('.s4 span').className= 'fas fa-arrow-down';
                            update('s4_down', this.search())
                        }
        
                        html.get('.s1 span').className= 'fas fa-arrows-alt-v';
                        html.get('.s2 span').className= 'fas fa-arrows-alt-v';
                        html.get('.s3 span').className= 'fas fa-arrows-alt-v';
        
                    })
                }
            }),
            html.get('.search').addEventListener('keyup', () => {
                this.goTo(1);
                update('', this.search());
            }),
            html.get('.perPage').addEventListener('change', ()=>{
                state.perPage = html.get('.perPage').value;
                this.goTo(1);
                update('', this.search());
            })
        },
        verify(s, callback){
            if(html.get(s) != null){
                callback(true);
            }else{
                callback(false);
            }
        },
        search(){
            if(html.get('.search').value.trim() != ''){
                let dataFilter = [];
                datas.forEach((data) => {
                    let attrs = Object.keys(data);
                    let word = html.get('.search').value.trim();
                    
                    if(
                        (data[attrs[0]] != undefined && data[attrs[0]].toString().indexOf(word) != -1)|| 
                        (data[attrs[1]] != undefined && data[attrs[1]].toString().indexOf(word) != -1) ||
                        (data[attrs[2]] != undefined && data[attrs[2]].toString().indexOf(word)!= -1) ||
                        (data[attrs[3]] != undefined && data[attrs[3]].toString().indexOf(word) != -1)){
                        dataFilter.push(data)
                    }
                })   
                return dataFilter;
            } 
        }
    }

    const table = {
        create(item){

            if(item != undefined){

                const tr =  document.createElement('tr');
                tr.classList.add('item');

                if(item.attr_1 != undefined){
                    let th = document.createElement('th')
                    th.innerHTML = item.attr_1;
                    tr.appendChild(th)
                }
                
                if(item.attr_2 != undefined){
                    td = document.createElement('td')
                    td.innerHTML = item.attr_2;
                    tr.appendChild(td)
                }
                    
                if(item.attr_3 != undefined){
                    td = document.createElement('td')
                    td.innerHTML = item.attr_3;
                    tr.appendChild(td)
                }

                if(item.attr_4 != undefined){
                    td = document.createElement('td')
                    span = document.createElement('span');
                    td.appendChild(span);
                    
                    if(item.attr_4 == true){
                        span.className = 'fas fa-check text-success';
                    }else if(item.attr_4== false){
                        span.className = 'fas fa-times text-danger'; 
                    }else{
                        span.innerHTML = item.attr_4;
                    }
                    tr.appendChild(td)
                }    
                html.get('#tbody').appendChild(tr)
            
            }

        },
        update(s, df){

            html.get('#tbody').innerHTML=""
            let page =  state.page - 1;
            if(page < 0){
                page = 0;
            }
            let start = page * state.perPage;
            let end = start + (state.perPage-1);

            let paginatedItems = []

            if(s === 's1_down'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_1 < b.attr_1) ? 1: -1 )
                }else{
                    df = df.sort((a,b) => (a.attr_1 < b.attr_1) ? 1: -1)
                }        
            }else if(s === 's1_up'){
                if(df == undefined){
                    datas = datas.sort((a,b) => (a.attr_1 > b.attr_1) ? 1: -1)
                }else{
                    df = df.sort((a,b) => (a.attr_1 > b.attr_1) ? 1: -1)
                }
            }else if (s === 's2_down'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_2 < b.attr_2) ? 1: -1 )
                }else{
                    df = df.sort((a,b) => (a.attr_2 < b.attr_2) ? 1: -1 )
                }
            }else if(s === 's2_up'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_2 > b.attr_2) ? 1: -1)
                }else{
                    df = df.sort((a,b) => (a.attr_2 > b.attr_2) ? 1: -1)
                }
            }else if(s === 's3_down'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_3 < b.attr_3) ? 1: -1 )
                }else{
                    df = df.sort((a,b) => (a.attr_3 < b.attr_3) ? 1: -1 )
                }
            }else if(s === 's3_up'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_3 > b.attr_3) ? 1: -1)
                }else{
                    df = df.sort((a,b) => (a.attr_3 > b.attr_3) ? 1: -1)
                }
            }else if(s === 's4_down'){
                if(df === undefined){
                    datas = datas.sort((a,b) =>  (a.attr_4 < b.attr_4) ? 1: -1 )
                }else{
                    df = df.sort((a,b) =>  (a.attr_4 < b.attr_4) ? 1: -1 )
                }
            }else if(s === 's4_up'){
                if(df === undefined){
                    datas = datas.sort((a,b) => (a.attr_4 > b.attr_4) ? 1: -1)
                }else{
                    df = df.sort((a,b) => (a.attr_4 > b.attr_4) ? 1: -1)
                }
            }
            
            if(df === undefined){
                for(let i = start; i <= end; i++){     
                    paginatedItems.push(datas[i]);
                }
            }else{
                for(let i = start; i <= end; i++){     
                    paginatedItems.push(df[i]);
                }
            }
            
        
            paginatedItems.forEach(table.create);
            
            if(df === undefined || df.length != 0){

                if(state.page == 0){
                    console.log(state.page);
                    state.page = 1;
                }
              
                end = state.page * state.perPage;
                start = end - state.perPage + 1;

                html.get('.itemInit').innerText = start;

                if(df === undefined){
                    if(datas.length < end){
                        end = datas.lenght;
                    }
                    html.get('.itemFinal').innerText = end;
                    html.get('.totalItem').innerText = datas.length;
                }else if(df.length != 0){

                    if(df.length <  end){
                        end = df.length;
                    }
                    html.get('.itemFinal').innerText = end;
                    html.get('.totalItem').innerText = df.length;
                }

            }else{

                html.get('.itemInit').innerText = 0;
                html.get('.totalItem').innerText = df.length;
                html.get('.itemFinal').innerText = 0;

            }


        }
    }
    const buttons = {
        element: html.get('.pagination'),

        create(number){

            button = document.createElement('li');
            button.className = "page-item number";
            span = document.createElement('span');
            span.className="page-link pl";
            span.textContent=number;
            button.appendChild(span);
            if(state.page == number){
                button.classList.add('active');
            }

            this.element.appendChild(button);

            controls.createListener(button, 'number')

        },
        update(){
            
            buttons.element.innerHTML = ""

            let button = document.createElement('li');
            button.className = "page-item first";
            let span = document.createElement('span');
            span.className="page-link fas fa-angle-double-left";
            button.appendChild(span);
            this.element.appendChild(button);

            controls.createListener(button, 'first');


            button = document.createElement('li');
            button.className = "page-item prev";
            span = document.createElement('span');
            span.className="page-link fas fa-angle-left";
            button.appendChild(span);
            this.element.appendChild(button);

            controls.createListener(button, 'prev');

            const { maxLeft, maxRight } = buttons.calculateMaxVisible();
            for(let page = maxLeft; page <= maxRight; page++){
                buttons.create(page)
            }
            
            button = document.createElement('li');
            button.className = "page-item next";
            span = document.createElement('span');
            span.className="page-link fas fa-angle-right";
            button.appendChild(span);
            this.element.appendChild(button);

            controls.createListener(button, 'next');

            button = document.createElement('li');
            button.className = "page-item last mr-0 mr-sm-3";
            span = document.createElement('span');
            span.className="page-link fas fa-angle-double-right";
            button.appendChild(span);
            this.element.appendChild(button);

            controls.createListener(button, 'last');

        },
        calculateMaxVisible(){
            let maxLeft = (state.page - Math.floor(state.maxVisibleButtons/2));
            let maxRight;
            if(state.page === 1 || state.page === 2){
                maxRight = state.maxVisibleButtons;
            }else{
                maxRight = (state.page + Math.floor(state.maxVisibleButtons/2));
            }

            if(maxLeft < 1){
                maxLeft = 1
            }

            if(maxRight > state.totalPage){

                maxLeft = state.totalPage - (state.maxVisibleButtons - 1);
                maxRight =  state.totalPage;
                
                if(maxLeft < 1){
                    maxLeft = 1;
                }
            }

            return {maxLeft, maxRight}
        }
    }

    function update(s, df){
        table.update(s, df)
        
        if(df != undefined){
            state.totalPage = Math.ceil(df.length/state.perPage)
        }else{
            state.totalPage = Math.ceil(datas.length/state.perPage)
        }    
        buttons.update()
    }

    function init_paginator(){
        state.perPage = 5;
        update()
        controls.createListeners();
    }

    function init_get(url){

        //A api fetch busca uma resposta na url

        fetch(url)

            .then(response => {

                // A requisição finalizou com sucesso.

                
                if (response.ok) {
                
                    // Converte a string JSON para um objeto JS 
                    // A execução prosseguirá para o próximo .then

                    return response.json();
                } 
                else {
                
                    // A execução será deslocada para o bloco 'catch'
            
                    return Promise.reject(response);
                }

            })

            .then(posts => {

                posts.forEach(post => {

                    let attrs = Object.keys(post);

                    if(post[attrs[0]] != undefined){

                        data.attr_1 = post[attrs[0]];
                    }
                    if(post[attrs[1]] != undefined){
                        data.attr_2 = post[attrs[1]];
                    }
                    if(post[attrs[2]] != undefined){
                        data.attr_3 = post[attrs[2]];
                    }
                    if(post[attrs[3]] != undefined){
                        data.attr_4 = post[attrs[3]];
                    }
                    
                    let cloneObj = {... data}

                    datas.push(cloneObj)
            
                });
            

            })

            .then(()=>{

                init_paginator();
            })
        
            .catch(error => {
        
                // Ocorreu um erro na comunicação com o servidor ou
                
                console.warn('Falha inesperada: ', error);
        
            });
        }

