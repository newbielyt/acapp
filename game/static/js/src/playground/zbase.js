class AcGamePlayground {
    constructor(root){
        this.root=root;
        this.$playground = $(`
            <div class="ac-game-playground"></div>
        `);
        this.hide();

        this.root.$ac_game.append(this.$playground);

        this.start();
    }

    get_random_x(){
        return Math.random()*this.width;
    }
    get_random_y(){
        return Math.random()*this.height;
    }

    get_random_color(){
        let colors = ["blue","red","pink","grey","green","yellow"];
        return colors[Math.floor(Math.random()*6)];
        //let colors = ["zx.jpg","yyx.jpg","lzy.jpg","qzh.jpg"];
        //return 'static/image/henau/'+colors[Math.floor(Math.random()*4)];
    }

    start(){
        let outer = this;
        $(window).resize(function() {      //窗口大小改变的话会执行该函数
            outer.resize();
        });
    }

    resize(){
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width/16, this.height/9);

        this.width = unit*16;
        this.height = unit*9;

        this.scale = this.height;
        if(this.game_map)this.game_map.resize();

    }

    show(mode){    //打开playground界面
        let outer = this;
        this.mode = mode;
        
        this.player_count = 0;

        this.$playground.show();
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);

        this.state = "Waiting";   //'waiting' -> 'fighting' -> 'over'  三种状态
        this.notice_board = new NoticeBoard(this);

        this.resize();

        this.players = [];
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.15, "me", this.root.settings.username, this.root.settings.photo));
        this.resize();
        if(mode === "single mode"){
            for(let i=0;i<6;i++){
                this.players.push(new Player(this, this.get_random_x()/this.scale, this.get_random_y()/this.scale, 0.05, this.get_random_color(), 0.15, "robot"));
            }
        }else if(mode === "multi mode"){
            this.chat_field = new Chat_Field(this);
            this.mps = new MultiPlayerSocket(this);

            this.mps.uuid = this.players[0].uuid;

            this.mps.ws.onopen = function(){
                outer.mps.send_create_player(outer.root.settings.username, outer.root.settings.photo);
            };
        }
    }

    hide(){      //关闭playground界面
        this.$playground.hide();
    }

}
