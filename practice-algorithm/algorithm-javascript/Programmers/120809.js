function solution(numbers) {
    const answer = numbers.map((number) => number * 2)
    
    return answer;
}

// return numbers.reduce((a, b) => [...a, b * 2], []);
// reduce를 사용해서도 풀 수 있다. 