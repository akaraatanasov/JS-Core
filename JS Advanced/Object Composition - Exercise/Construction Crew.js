function crew(worker) {
    if (worker.handsShaking) {
        worker.bloodAlcoholLevel += worker.experience * worker.weight * 0.1;
        worker.handsShaking = false;
    }

    return worker;
}