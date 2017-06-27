function doTheseLineSegmentsIntersect(p0_x, p0_y, p1_x, p1_y,p2_x, p2_y, p3_x, p3_y) {
    var s1_x, s1_y, s2_x, s2_y;
    var s1_x = p1_x - p0_x;
    var s1_y = p1_y - p0_y;
    s2_x = p3_x - p2_x;     s2_y = p3_y - p2_y;

    var s, t;
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y);
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);

    if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
        return {x:p0_x + (t * s1_x), y:p0_y + (t * s1_y)};
    }
    return false; // No collision
}

function getMXBForLine(x1,y1,x2,y2) {
    var run = x2-x1;
    var m = 0;
    if(run !== 0) {
        m = (y2-y1)/run;
    }
    var b = y1 - m*x1;
    return {m:m,b:b};
}

function getMidPoint(x1,y1,x2,y2,p) {
    var run = (x2-x1);
    var x = x1 + run*p;
    var rise = (y2-y1);

    var y = y1 + p*rise;
    return {x:x,y:y};
}
/**
 * Calculates the angle (in radians) between two vectors pointing outward from one center
 *
 * @param p0 first point
 * @param p1 second point
 * @param c center point
 */
function find_angle(p0,p1,c) {
    var p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+
        Math.pow(c.y-p0.y,2)); // p0->c (b)
    var p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+
        Math.pow(c.y-p1.y,2)); // p1->c (a)
    var p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+
        Math.pow(p1.y-p0.y,2)); // p0->p1 (c)
    return Math.acos((p1c*p1c+p0c*p0c-p0p1*p0p1)/(2*p1c*p0c));
}