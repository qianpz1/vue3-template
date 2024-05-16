<template>
    <div class="loading">
        <div class="battery"></div>
    </div>
</template>
<style scoped lang="scss">
.loading {
    width: 100vw;
    height: 100vh;
}
.battery{
    width: 28px;
    height: 14px;
    border: 1px #409eff solid;
    border-radius: 2px;
    position: relative;
    animation: charge 5s linear infinite;
    margin: 0 auto;
}
.battery:after{
    width: 2px;
    height: 7px;
    background-color: #409eff;
    border-radius: 0px 1px 1px 0px;
    position: absolute;
    content: "";
    top: 2px;
    right: -4px;
}

.battery::before {
    content: 'loading...';
    color: #409eff;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate(-25%, 125%);
}

@keyframes charge{
    0%{box-shadow: inset 0px 0px 0px #409eff;}
    100%{box-shadow: inset 30px 0px 0px #409eff;}
}
</style>