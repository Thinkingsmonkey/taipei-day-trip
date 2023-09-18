function* okGenerator() {
  try {
    const week1Result = yield getResult("week1URL");
    console.log(week1Result);

    const week2Result = yield getResult("week2URL");
    console.log(week2Result);

    const week3Result = yield getResult("week3URL");
    console.log(week3Result);
  } catch (e) {
    console.error("An error occurred:", e);
  }
}
function getResult(url) {
  let week3Task = new Promise((resolve) => {
    resolve("Congratulations");
  });

  let week2Task = new Promise((resolve) => {
    resolve("ok! Done");
  });

  let week1Task = new Promise((resolve) => {
    resolve("ok! Done");
  });
  if (url === "week1URL") return week1Task;
  if (url === "week2URL") return week2Task;
  if (url === "week3URL") return week3Task;
}
function wehelp(generator) {
  let task = generator();

  function loop(taskResult) {
    if (taskResult.done) return;

    const taskMessage = taskResult.value;
    if (taskMessage instanceof Promise) {
      taskMessage
        .then((res) => loop(task.next(res)))
        .catch((err) => task.throw(err));
    }
  }
  try {
    loop(task.next());
  } catch (e) {
    console.log(e);
  }
}

wehelp(okGenerator);
