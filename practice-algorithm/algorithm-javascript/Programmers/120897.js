// 약수 구하기 

function solution(n) {
    var answer = [];
   
    for(let i = 1; i<= Math.sqrt(n); i++){
        if(n % i == 0){
            answer.push(i);
            
            if( i * i != n){
                answer.push(n / i);
            }
        }
    }
    
    // answer.sort()로 하면 숫자를 문자열로 변환하여 정렬하기 때문에 원하는 결과를 얻을 수 없다. 따라서 다음과 같이 정렬한다. 
    answer.sort(function(a,b){
        return a - b;
    })
    
    return answer;
} 