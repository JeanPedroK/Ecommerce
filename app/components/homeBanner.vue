<template>
	<div class="col-12 row banner">
		<div class="ctr-btn prev" @click="setImageIndex(currentImageIndex - 1)">
			<b-icon icon="arrow-left"></b-icon>
		</div>
		<div class="carrossel ">
			<div class="slider" >
				<a v-for="(img, im) in images" :key="im" :href="img.href" v-show="img.img != ''" >
					<img :src="img.img" :class="{ selected: (im == currentImageIndex) }">
				</a>
			</div>
		</div>
		<div class="ctr-btn next" @click="setImageIndex(currentImageIndex + 1)">
			<b-icon icon="arrow-right"></b-icon>
		</div>
	</div>
</template>
<script>

export default {
	name: 'homeBanner',
	props: {
		list: {
			type: Object,
			required: true
		},
	},
	data() {
		return {
			currentImageIndex: 0,
			bannerTimer: 3000,
			maxImages: 0,
			type: '',
			images: [

				{
					href: "img3",
					img: "https://wallpaperaccess.com/full/889705.jpg"
				},
				{
					href: "img1",
					img: "https://www.kunsler.com.br/admin/arquivos/home/blob.7_10_2022_18_59_21.png"
				},
				{
					href: "img2",
					img: "https://kunsler.com.br/admin/arquivos/home/blob.18_09_2022_10_35_15.png"
				},
				{
					href: "img4",
					img: "https://kunsler.com.br/admin/arquivos/home/blob.8_06_2022_11_08_07.png"
				}
			]
		}
	},
	mounted() {

		let imgs = this.list.child[0].child[0]


		this.images = imgs.child.map((i) => {

			return {
				img: i.src,
				href: ''
			}

		});


		this.maxImages = this.images.length;
		this.startNodeBanner();
	},
	methods: {
		setImageIndex(index) {
			if (index > this.maxImages) {
				index = 0;
			} else if (index < 0) {
				index = this.maxImages - 1;
			}

			this.currentImageIndex = index;
		},

		nextImage() {
			this.currentImageIndex++
			if (this.currentImageIndex >= this.images.length) {
				this.currentImageIndex = 0;
			}
		},

		startNodeBanner() {
			const self = this;
			setInterval(() => {
				self.nextImage();
			}, this.bannerTimer)
		},
	}
}
</script>
<style lang="scss" scoped>
.banner {
	margin: 0;
	padding: 0;

	.carrossel {
		position: relative;
		width: 100%;

		.slider {
			width: 100%;
			height: 29vw;
			max-height: 600px;
			position: relative;
			margin-top: -.71%;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: auto;

			img {
				opacity: 0;
				position: absolute;
				width: 100%;
				height: 100%;
				object-fit: contain;
				transition: opacity 500ms;

				&.selected {
					opacity: 1;
				}
			}
		}
	}
}

.ctr-btn {
	position: absolute;
	width: 40px;
	height: 40px;
	border-radius: 100%;
	z-index: 1;
	top: 43%;
	padding-top: 8px;
	cursor: pointer;

	&.next {
		right: 15px;
		padding-left: 12px;
		margin-left: 3%;
	}

	&.prev {
		left: 15px;
		padding-left: 12px;
	}
}

@media screen and (max-width: 414px) {

	.banner {
		.carrossel {
			.slider {
				width: 100%;
				// max-width: 1110px;
				// height: 35vw;
				max-height: 400px;
				position: relative;
				margin: 0 auto;
				// left: -14px;
			}
		}

		.ctr-btn {
			&.prev {
				background-color: transparent;
				left: 1%;
				top: 32%;
				padding-left: 17px;
				color: white;
			}

			&.next {
				background-color: transparent;
				// left: 98%;
				padding-left: 17px;
				margin-left: 3%;
				top: 32%;
				color: white;

			}
		}
	}
}
</style>