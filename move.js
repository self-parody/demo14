
//获取指定的非行内样式属性值(返回结果类型为字符串，自带单位)
    function getStyle(obj,styleName){
        if(obj.currentStyle){
            return obj.currentStyle[styleName];
        }
        else{
            return getComputedStyle(obj,false)[styleName];
        }
    }
    //可将不同元素对象、样式属性、目标值传入缓冲运动框架
    function move(obj,attr,target){
        clearInterval(obj.timer);
        //opacity属性值的特点是小数、不带单位，需特别处理
        if(attr=='opacity'){
            target*=100;
        }
        obj.timer=setInterval(function(){
            //获取样式属性当前值，并转换为number类型
            var current=0;
            if(attr=='opacity'){     
                //由于小数在计算机中的存储并不精确且位数很多，如下就存在0.07*100=7.00……01等问题，故可进行四舍五入使结果保持为整数              
               current=Math.round(parseFloat(getStyle(obj,attr))*100);
            }
            else{
                current=parseInt(getStyle(obj,attr));
            }
      
            //计算运动速度,并做取整处理
            var speed=(target-current)/5;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);
            if(current==target){
                clearInterval(obj.timer);
            }
            else{
                if(attr=='opacity'){
                    obj.style[attr]=(current+speed)/100;
                }
                else{
                    obj.style[attr]=current+speed+'px';
                }
            }
        },30);
    }

    