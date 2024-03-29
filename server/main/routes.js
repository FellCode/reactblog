var express = require('express')
var router = express.Router()
var pool = require('./db')


router.get('/api/get/allposts', (req,res,next) => {
    pool.query(`SELECT * FROM posts
    ORDER BY date_created DESC`,
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})

router.get('/api/get/post', (req,res,next) => {
    const post_id = req.query.post_id

    pool.query(`SELECT * FROM posts
    WHERE pid=$1`,
    [post_id], (q_err,q_res) => {
        res.json(q_res.rows)
    })
})


router.post('/api/post/posttodb', (req,res,next) => {
    const values = [req.body.title,
                    req.body.body,
                    req.body.uid,
                    req.body.username]

    pool.query(`INSERT INTO posts(title, body, user_id,author,date_created) VALUES ($1,$2,$3,$4, NOW())`,
    values, (q_err,q_res) => {
        if(q_err) return next (q_err);
        res.json(q_res.rows)
    })
})


router.put('/api/put/post', (req,res,next) => {
    const values = [req.body.title,
                    req.body.body,
                    req.body.uid,
                    req.body.pid,
                    req.body.username]

    pool.query(`UPDATE posts SET title=$1,body=$2,uid=$3,pid=$4,username=$5, date_created=NOW() WHERE pid= $4 `,
    values, (q_err,q_res) => {
        console.log(q_err)
        console.log(q_res.rows)
    })
})


router.delete('/api/delete/postcomments', (req,res,next) => {
    const post_id = req.query.post_id

    pool.query(`DELETE * FROM comments
    WHERE pid=$1`,
    [post_id], (q_err,q_res) => {
        res.json(q_res.rows)
        console.log(q_err)
    })
})

router.delete('/api/delete/post', (req,res,next) => {
    const post_id = req.query.post_id

    pool.query(`DELETE * FROM posts
    WHERE pid=$1`,
    [post_id], (q_err,q_res) => {
        res.json(q_res.rows)
        console.log(q_err)
    })
})


router.put('/api/put/likes', (req,res, next) => {
    const uid = [req.body.uid]
    const post_id = String(req.body.post_id)
    
    const values = [uid, post_id]
    console.log(values)

    pool.query(`UPDATE posts
                SET like_user_id = like_user_id || $1, likes = likes+1
                WHERE NOT (like_user_id @> $1)
                AND pid= ($2)`,
    values, (q_err,q_res) => {
        res.json(q_res.rows)
        console.log(q_res)
    })
})


router.post('/api/post/commenttodb', (req,res,next) => {
    const values = [req.body.comment,
                    req.body.user_id,
                    req.body.username,
                    req.body.post_id]

    pool.query(`INSERT INTO comments(comment, user_id,author,post_id,date_created) VALUES ($1,$2,$3,$4, NOW())`,
    values, (q_err,q_res) => {
        if(q_err) return next (q_err);
        res.json(q_res.rows)
    })
})

router.put('/api/put/commenttodb', (req,res,next) => {
    const values = [req.body.comment,
                    req.body.user_id,
                    req.body.post_id,
                    req.body.username,
                    req.body.cid]

    pool.query(`UPDATE comments SET comment=$1, user_id = $2,post_id = $3,author = $4, cid=$5) VALUES ($1,$2,$3,$4, NOW())`,
    values, (q_err,q_res) => {
        if(q_err) return next (q_err);
        res.json(q_res.rows)
    })
})


router.delete('/api/delete/comment', (req,res,next) => {
    const cid = req.query.comment_id

    pool.query(`DELETE * FROM posts
    WHERE cid=$1`,
    [cid], (q_err,q_res) => {
        res.json(q_res.rows)
        console.log(q_err)
    })
})

router.get('/api/get/allpostcomments', (req,res,next) => {
    const post_id = String(req.body.post_id)


    pool.query(`SELECT * FROM comments
    WHERE post_id=$1`, [post_id],
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})

router.get('/api/get/userprofilefromdb', (req,res,next) => {
    const email = req.body.email
    console.log(email)

    pool.query(`SELECT * FROM users
    WHERE email=$1`, [email],
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})

router.get('/api/get/userposts', (req,res,next) => {
    const user_id = req.query.user_id
    console.log(user_id)

    pool.query(`SELECT * FROM posts
    WHERE user_id=$1`, [user_id],
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})

router.get('/api/get/otheruserprofilefromdb', (req,res,next) => {
    const username = String(req.query.username)

    pool.query(`SELECT * FROM users
    WHERE user_id=$1`, [username],
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})


router.get('/api/get/otheruserposts', (req,res,next) => {
    const username = String(req.query.username)

    pool.query(`SELECT * FROM posts
    WHERE author=$1`, [username],
    (q_err,q_res) => {
        res.json(q_res.rows)
    })
})

module.exports = router