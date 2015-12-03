// ================================================================================================================================
// enemyShip.js
// -------------------------------------------------------------------------------------------------------------------------------
// @author Angela Gross and Kyle Handy
// Xeinax: Space Warrior
// -------------------------------------------------------------------------------------------------------------------------------
// EnemyShip class extension and EnemyShip subclasses: Destroyer, Slasher, Tanker
// ===============================================================================================================================

// ENEMY SHIP
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**==========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {string} mainSprite - key for ship sprite image
* @param {string[]} explosionFrames - string of explosion frames
* @param {float} maxHealth - maximum and starting health for ship
* @param {float} speed - movement speed
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description EnemyShip constructor does not need to be overriden
*///=========================================================================================================================
EnemyShip = function (game, x, y, mainSprite, explosionFrames, maxHealth, speed, skills, group)
{
    Ship.call(this, game, x, y, mainSprite, explosionFrames, maxHealth, speed, skills, group);

    // boundary values for enemy ship flight space
    // top and right are 0
    this.bottomBoundary = game.height * .3;
    this.rightBoundary = game.width;

    this.exists = false;
}

EnemyShip.prototype = Object.create(Ship.prototype);
EnemyShip.prototype.constructor = EnemyShip;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ENEMY SHIP FUNCTIONS
    // --------------------------------------------------------------------------------------------------------------------------

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**==========================================================================================================================
    * @name ACT
    *  
    * @description ABSTRACT performs the enemies behavior
    *///=========================================================================================================================
    EnemyShip.prototype.act = function ()
    {

        // movement variables
        var down = false;
        var up = false;
        var right = false;
        var left = false;

        // horizontal movement decision
        // 0: none; 1: left; 2: right;
        var horizontalDecision = this.horizontalMovement();

        // decode horizontal decision return
        switch (horizontalDecision)
        {
            case 1: left = true; break;
            case 2: right = true; break;
        }

        // vertical movement decision
        // 0: none; 1: up; 2: down;
        var verticalDecision = this.verticalMovement();

        // decode vertical decision return
        switch (verticalDecision)
        {
            case 1: up = true; break;
            case 2: down = true; break;
        }

        // move according to horizontal/vertical decisions
        this.move(up, right, down, left);

        // fire if decided to fire
        if (this.shouldFire()) this.skills[0].fire(this);

    };

    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description ABSTRACT determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    EnemyShip.prototype.horizontalMovement = function () { };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description ABSTRACT determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    EnemyShip.prototype.verticalMovement = function () { };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description ABSTRACT determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    EnemyShip.prototype.shouldFire = function () { };

    /**==========================================================================================================================
    * @name PLAYER IS TO LEFT
    *  
    * @description determines if the player ship's x position is less than this ship's x position
    *
    * @returns {bool} - true if player ship is to left of enemy ship, false otherwise
    *///=========================================================================================================================
    EnemyShip.prototype.playerIsToLeft = function ()
    {
        // player ship's x position
        var playerX = game.state.states['Game'].playerShip.body.x;
        
        // return whether player x is less than this ship's x
        return (playerX < this.body.x);
    };


// DESTROYER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {Phaser.Group} group - physics group to add ship to
*
* @description Destroyer constructor
*///=========================================================================================================================
Destroyer = function (game, x, y, group)
{
    // visible parameters
    var mainSprite = 'red_ship_03';
    var maxHealth = 50;
    var speed = 2;

    // destroyer ship skill
    var damage = 60;
    var maxProjectiles = 50;
    var bulletSpeed = 250;
    var fireRate = 3000;
    var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
    var destroyerSkill = new DestroyerSkill(
        "med_ball_blue_laser",
        "destroyerProjectiles",
        damage,
        maxProjectiles,
        bulletSpeed,
        fireRate,
        explosionFrames
    );

    // call super class constructor
    EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [destroyerSkill], group);

    // yHover variable, ship's vertical hover position
    this.yHover = Math.random() * this.bottomBoundary;

    //horizontal direction tracker, 1 = right, 2 = left
    this.currentHorizontalDirection = 1; 

    // intervals on which the ship can react to enemy position
    this.nextReaction = 0;
    this.reactionRate = 1000;

    // firing range, the max difference between player ship x and destroyer x for deciding to fire
    this.firingRange = 10;

    // scale destroyer sprite
    this.scale.setTo(0.5, 0.5);
}
Destroyer.prototype = Object.create(EnemyShip.prototype);
Destroyer.prototype.constructor = Destroyer;


    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description OVERRIDE determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    Destroyer.prototype.horizontalMovement = function ()
    {
        // if near left boundary go right
        if (this.body.x < 20)
        {
            this.currentHorizontalDirection = 2;
            return this.currentHorizontalDirection;
        }

        // if near right boundary go left
        if (this.body.x > (game.width - 20))
        {
            this.currentHorizontalDirection = 1;
            return this.currentHorizontalDirection;
        }
        // if not ready to react then continue in current direction
        if (game.time.time < this.nextReaction) return this.currentHorizontalDirection;

        // else react to the player's position
        this.nextReaction = game.time.time + this.reactionRate;

        // player is to left, go left
        if (this.playerIsToLeft())
        {
            this.currentHorizontalDirection = 1;
            return this.currentHorizontalDirection;
        }

        // player is to right, go right
        else
        {
            this.currentHorizontalDirection = 2;
            return this.currentHorizontalDirection;
        }
    };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description OVERRIDE determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    Destroyer.prototype.verticalMovement = function ()
    {
        // if lower than yHover go up
        if (this.body.y > this.yHover) return 1;

        // else if higher than yHover go down
        else if (this.body.y < this.yHover) return 2;

        // else stay put
        else return 0;
    };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    Destroyer.prototype.shouldFire = function ()
    {
        // player's X position
        var playerX = game.state.states['Game'].playerShip.body.x;

        // return true if x difference is within firingRange
        if (Math.abs(playerX - this.body.x) <= this.firingRange) return true;

        // else return false
        else return false;
    };

// SLASHER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------

/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description Slasher constructor
*///=========================================================================================================================
Slasher = function (game, x, y, skills, group)
{
    // visible parameters
    var mainSprite = 'red_ship_02';
    var maxHealth = 20;
    var speed = 6;

    // slasher ship skill
    var damage = 10;
    var maxProjectiles = 50;
    var bulletSpeed = 500;
    var fireRate = 3000;
    var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
    var slasherSkill = new SlasherSkill(
        "green_laser_01",
        "slasherProjectiles",
        damage,
        maxProjectiles,
        bulletSpeed,
        fireRate,
        explosionFrames
    );

    // call superclass constructor
    EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [slasherSkill], group);

    // direction trackers
    this.currentVerticalDirection = 2;
    this.currentHorizontalDirection = 2;

    // intervals on which the ship can react to enemy position
    this.nextReaction = 0;
    this.reactionRate = 500;
    
    // scale slasher sprite
    this.scale.setTo(0.4, 0.4);
}
Slasher.prototype = Object.create(EnemyShip.prototype);
Slasher.prototype.constructor = Slasher;

    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description OVERRIDE determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    Slasher.prototype.horizontalMovement = function ()
    {
        // if near left boundary go right
        if (this.body.x < 20)
        {
            this.currentHorizontalDirection = 2;
            return this.currentHorizontalDirection;
        }

        // if near right boundary go left
        if (this.body.x > (game.width - 20))
        {
            this.currentHorizontalDirection = 1;
            return this.currentHorizontalDirection;
        }
        // if not ready to react then continue in current direction
        if (game.time.time < this.nextReaction) return this.currentHorizontalDirection;

        // else react to the player's position
        this.nextReaction = game.time.time + this.reactionRate;

        // player is to left, go left
        if (this.playerIsToLeft())
        {
            this.currentHorizontalDirection = 1;
            return this.currentHorizontalDirection;
        }

        // player is to right, go right
        else
        {
            this.currentHorizontalDirection = 2;
            return this.currentHorizontalDirection;
        }
    };

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description OVERRIDE determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    Slasher.prototype.verticalMovement = function ()
    {
        // if near upper boundary go down
        if (this.body.y < 20)
        {
            this.currentVerticalDirection = 2;
            return this.currentVerticalDirection;
        }

        // if beyond bottom boundary go up
        if (this.body.y > (this.bottomBoundary - 20))
        {
            this.currentVerticalDirection = 1;
            return this.currentVerticalDirection;
        }

        
        // change direction with .1 prob
        if (Math.random() < .1)
        {
            // choices are directions other than current direction
            // example current = 1: 1 + 1 % 3 = 2; 1 + 2 % 3 = 0
            var choices = [(this.currentVerticalDirection + 1) % 3, (this.currentVerticalDirection + 2) % 3]

            // randomly choose from choices
            if (Math.random() < .5) return this.currentVerticalDirection = choices[0];
            else return this.currentVerticalDirection = choices[1];
        }

        // else continue in current direction
        else return this.currentVerticalDirection;

    };

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    Slasher.prototype.shouldFire = function ()
    {
        return true;
    };

// TANKER
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// CONSTRUCTOR
// --------------------------------------------------------------------------------------------------------------------------
    
/**=========================================================================================================================
* @param {Phaser.Game} game - game that sprite will be added to
* @param {float} x - horizontal (x) location of sprite
* @param {float} y - vertifcal (y) location of sprite
* @param {Skill[]} skills - list of skill objects for ship
* @param {Phaser.Group} group - physics group to add ship to
*
* @description Tanker constructor
*///=========================================================================================================================
Tanker = function (game, x, y, skills, group)
{
    // visible parameters
    var mainSprite = 'red_ship_01';
    var maxHealth = 100;
    var speed = 3;

    // tanker ship skill
    var damage = 30;
    var maxProjectiles = 50;
    var bulletSpeed = 1;
    var fireRate = 1500;
    var explosionFrames = new gameUtils.FramesInfo("expl_02_", 0, 23, "", 4);
    var tankerSkill = new TankerSkill(
        "large_pink_laser",
        "tankerProjectiles",
        damage,
        maxProjectiles,
        bulletSpeed,
        fireRate,
        explosionFrames
    );

    // call super constructor
    EnemyShip.call(this, game, x, y, mainSprite, maxHealth, speed, [tankerSkill], group);
    this.scale.setTo(0.7, 0.7);

    // first position
    // random x, random y
    this.xPost = Math.random() * this.rightBoundary;
    this.yPost = Math.random() * this.bottomBoundary;

    // how long the tanker should remain posted up (includes time to travel to post)
    this.postUpTime = 3000;

    // when the tanker should go for its next change
    this.nextChange = game.time.time + this.postUpTime + 2000; // extra time to ensure tanker makes it to first spot

    // movement radius, radius upon which tanker selects next post up
    this.movementRadius = 50;

    // firing range, the max difference between player ship x and destroyer x for deciding to fire
    this.firingRange = 15;

}
Tanker.prototype = Object.create(EnemyShip.prototype);
Tanker.prototype.constructor = Tanker;

    /**==========================================================================================================================
    * @name HORIZONTAL MOVEMENT
    *  
    * @description OVERRIDE determines which horizontal movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for left, 2 for right
    *///=========================================================================================================================
    Tanker.prototype.horizontalMovement = function ()
    {
        // if time to make a change choose new position close by
        // this update happens in the horizontalMovement function because it is called
        // first within the common act function and therefore will apply to the 
        // corresponding verticalMovement function
        if (game.time.time > this.nextChange)
        {
            // eliminate choices that lead into boundary
            var nonChoices = [];
            if (this.body.y < (this.movementRadius + 15)) nonChoices.push(1); // can't go up
            if (this.body.y > (this.bottomBoundary - (this.movementRadius + 15))) nonChoices.push(2); // can't go down
            if (this.body.x < (this.movementRadius + 15)) nonChoices.push(3); // can't go left
            if (this.body.x < (this.bottomBoundary - (this.movementRadius + 15))) nonChoices.push(4); // can't go right

            var choices = []
            // get the choices that remain
            for (var i = 1; i < 5; i++)
            {
                if (nonChoices.indexOf(i) === -1) choices.push(i);
            }

            // choose a legal direction
            var choice = choices[Math.floor(Math.random() * choices.length)];

            // react to choice
            switch (choice)
            {
                case 1: this.yPost -= this.movementRadius; break; // up
                case 2: this.yPost += this.movementRadius; break; // down
                case 3: this.xPost -= this.movementRadius; break; // left
                case 4: this.xPost += this.movementRadius; break; // right
            }

            // set time till next switch
            this.nextChange = game.time.time + this.postUpTime;
        }

        // if post up is to the right go right
        if (this.body.x - this.xPost < -2)
        {
            return 2;
        }

        // if post up is to the left go left
        if (this.body.x - this.xPost > 2)
        {
            return 1;
        }

        // default don't move
        return 0;
    }

    /**==========================================================================================================================
    * @name VERTICAL MOVEMENT
    *  
    * @description OVERRIDE determines which vertical movement action the ship should take
    *
    * @returns {int} - 0 for no movement, 1 for up, 2 for down
    *///=========================================================================================================================
    Tanker.prototype.verticalMovement = function ()
    {
        // if post up is upwards go up
        if (this.body.y - this.yPost > 2)
        {
            return 1;
        }

        // if post up is downwards go down
        if (this.body.y - this.yPost < -2)
        {
            return 2;
        }

        // default don't move
        return 0;
    }

    /**==========================================================================================================================
    * @name SHOULD FIRE
    *  
    * @description determines if the ship should fire, does not consider if the ship CAN fire
    *
    * @returns {bool} - true if should fire, false otherwise
    *///=========================================================================================================================
    Tanker.prototype.shouldFire = function ()
    {
        // player's X position
        var playerX = game.state.states['Game'].playerShip.body.x;

        // return true if x difference is within firingRange
        if (Math.abs(playerX - this.body.x) <= this.firingRange) return true;

        // else return false
        else return false;
    };