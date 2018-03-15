var vector2d = function (x, y) {
    var vec = {
        vx: x,
        vy: y,
        // 缩放
        scale: function (scale) {
            vec.vx *= scale;
            vec.vy *= scale;
        },
        //加 另一个向量
        add: function (vec2) {
            vec.vx += vec2.vx;
            vec.vy += vec2.vy;
        },
        //减 另一个向量
        sub: function (vec2) {
            vec.vx -= vec2.vx;
            vec.vy -= vec2.vy;
        },
        //相反方向
        negate: function () {
            vec.vx = -vec.vx;
            vec.vy = -vec.vy;
        },
        //向量长度
        length: function () {
            return Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
        },
        //向量长度的平方
        lengthSquared: function () {
            return vec.vx * vec.vx + vec.vy * vec.vy;
        },
        //标准化
        normalize: function () {
            var len = Math.sqrt(vec.vx * vec.vx + vec.vy * vec.vy);
            if (len) {
                vec.vx /= len;
                vec.vy /= len;
            }
            return len;
        },
        //旋转
        rotate: function (angle) {
            var vx = vec.vx,
                vy = vec.vy,
                cosVal = Math.cos(angle),
                sinVal = Math.sin(angle);
            vec.vx = vx * cosVal - vy * sinVal;
            vec.vy = vx * sinVal + vy * cosVal;
        },
        //调试
        toString: function () {
            return '(' + vec.vx.toFixed(3) + ',' + vec.vy.toFixed(3) + ')';
        }
    };
    return vec;
};