<template>
    <div class="home-page">
        <div class="container">
            <div class="left-wrap" ref="col1">
                <div class="card-item" v-for="item in dataList1" :key="item.id">
                    <div class="play" v-show="item.type == 'VIDEO'">
                        <img :src="playSvg" alt="">
                    </div>
                    <div class="card-one">
                        <img class="cover" :src="item.imgCoverLink" alt="">
                        <div class="text-content">
                            <p class="title">{{ item.title }}</p>
                            <span class="form-game">{{ item.formGame }}</span>
                            <div class="user-profile">
                                <div class="user">
                                    <img class="avatar" :src="item.userAvatarLink" alt="">
                                    <span class="nick-name">{{ item.userNick }}</span>
                                </div>
                                <div class="likes">
                                    <img class="like" :src="likeSvg" alt="">
                                    <span class="like-count">{{ item.likeCounts }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-wrap" ref="col2">
                <div class="card-item" v-for="item in dataList2" :key="item.id">
                    <div class="play" v-show="item.type == 'VIDEO'">
                        <img :src="playSvg" alt="">
                    </div>
                    <div class="card-one">
                        <img class="cover" :src="item.imgCoverLink" alt="">
                        <div class="text-content">
                            <p class="title">{{ item.title }}</p>
                            <span class="form-game">{{ item.formGame }}</span>
                            <div class="user-profile">
                                <div class="user">
                                    <img class="avatar" :src="item.userAvatarLink" alt="">
                                    <span class="nick-name">{{ item.userNick }}</span>
                                </div>
                                <div class="likes">
                                    <img class="like" :src="likeSvg" alt="">
                                    <span class="like-count">{{ item.likeCounts }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div ref="loading-trigger" style="height: 1px;"></div>
        <p class="tip" v-show="!isTouchBottom">正在加载更多...</p>
        <p class="tip" v-show="isTouchBottom">没有更多了~</p>
    </div>
</template>

<script>
import { getHomeData } from '@/api'
export default {
    name: 'HomePage',
    data() {
        return {
            likeSvg: require("@/assets/images/like.svg"),
            playSvg: require("@/assets/images/play.svg"),
            dataList: [],
            dataList1: [],
            dataList2: [],
            pagination: {
                page: 1,
                limit: 10
            },
            isTouchBottom: false,
            loading: false
        }
    },
    async mounted() {
        const data = await getHomeData()

        if (data.data.code == 200) {
            this.dataList = data.data.data
            this.mountMenu()
        }

        const loadingTrigger = this.$refs["loading-trigger"]

        // 使用 IntersectionObserver 监听
        this.observer = new IntersectionObserver((entries,observer) => {
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    this.loadMoreData(observer);
                }
            })
        }, { threshold: 0.1 }); // 当 10% 可见时触发

        this.observer.observe(loadingTrigger);
    },
    methods: {
        mountMenu(arg) {
            var temp = this.dataList
            var index = arg || 0
            var refName = this.selectCol()
            if (temp.length > index) {
                this[refName].push(this.dataList[index])
                this.$nextTick(() => {
                    this.mountMenu(index + 1)
                })
            }
        },
        selectCol() {
            var getHeight = (ref) => {
                return this.$refs[ref].offsetHeight
            }
            var height1 = getHeight('col1')
            var height2 = getHeight('col2')
            switch (Math.min(height1, height2)) {
                case height1:
                    return 'dataList1'
                case height2:
                    return 'dataList2'
                default:
                    break
            }
        },
        async loadMoreData(observer) {
            if (!this.loading) return;
            this.loading = true;
            const data = await getHomeData()
            console.log(data.data);

            if (data.data.code == 200) {
                if (this.pagination.limit * this.pagination.page >= data.data.data.length) {
                    // 触底了
                    console.log(8565);
                    
                    this.isTouchBottom = true
                    return
                }
                this.dataList = [...this.dataList, ...data.data.data.slice((this.pagination.page - 1) * this.pagination.limit, this.pagination.limit * this.pagination.page)]
                console.log(this.dataList);

                this.mountMenu()
                this.pagination.page++;
                const loadingTrigger = this.$refs["loading-trigger"]
                observer.disconnect()
                observer.observe(loadingTrigger);

            }
        },
    },
}
</script>

<style lang="less" scoped>
.home-page {
    padding: 5px;
    // height: 75vh;
    // overflow: scroll;
    // overflow-x: hidden;

    .container {
        column-count: 2;
        column-gap: 5px;
        max-width: 100%;
        margin: 0 auto;

        .card-item {
            position: relative;

            .play {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: rgba(0, 0, 0, .5);
                display: flex;
                align-items: center;
                justify-self: center;
                position: absolute;
                top: 10px;
                right: 10px;
                z-index: 9999;

                img {
                    width: 15px;
                    height: 15px;
                    margin: 0 auto;
                }
            }

            .card-one {
                border-radius: 5px;
                overflow: hidden;
                padding: 0 0 10px 0;
                margin-bottom: 5px;
                break-inside: avoid;
                /*防止断点*/
                background: #fff;
                text-align: left;

                .cover {
                    width: 100%;
                }

                .text-content {
                    padding: 0 10px;

                    .title {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        text-align: left;
                    }

                    .form-game {
                        text-align: left;
                        display: block;
                        margin: 10px 0;
                        font-size: 14px;
                        color: #999;
                    }

                    .user-profile {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .user {
                            display: flex;
                            align-items: center;
                            gap: 5px;

                            .avatar {
                                width: 25px;
                                height: 25px;
                                border-radius: 50%;
                            }

                            .nick-name {
                                font-size: 14px;
                                color: #999;

                            }
                        }

                        .likes {
                            display: flex;
                            align-items: center;
                            gap: 2px;

                            .like {
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>