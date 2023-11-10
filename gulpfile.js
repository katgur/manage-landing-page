import gulp from "gulp";
const { series, watch, src, dest } = gulp;
import sass from 'gulp-dart-sass';
import plumber from "gulp-plumber";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import concat from "gulp-concat-css";
import minify from "gulp-csso";
import server from "browser-sync";
import gulpclean from 'gulp-clean';
import rename from "gulp-rename";
import convertwebp from "gulp-webp";
import jsmin from 'gulp-jsmin';
import htmlmin from 'gulp-htmlmin';
import svgstore from "gulp-svgstore";

function clean() {
    return src('dist/', { read: false })
        .pipe(gulpclean());
}

export function html() {
    return src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest("dist/"));
}

function scss() {
    return src("src/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(concat("index.css"))
        .pipe(minify())
        .pipe(rename("index.min.css"))
        .pipe(dest("dist/style/"));
}

function style() {
    return src("src/style/*.css")
        .pipe(dest("dist/style/"));
}

function fonts() {
    return src('src/fonts/*.ttf')
        .pipe(dest('dist/fonts/'))
}

function images() {
    return src("src/images/*.{png,svg,webp,jpg}")
        .pipe(dest('dist/images'))
}

function webp() {
    return src("dist/images/*.{png,jpg}")
        .pipe(convertwebp({ quality: 90 }))
        .pipe(dest("dist/images/"));
}

const sprite = () => {
    return src("src/images/sprite/*.svg")
        .pipe(svgstore())
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("dist/images"))
}

export function scripts() {
    return src("src/js/*.js")
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist/js'))
}

function serve() {
    server.init({
        server: 'dist',
        cors: true
    });

    watch("src/**/*.html").on("change", series(html, server.reload));
    watch("src/**/*.{scss,sass}").on("change", series(scss, server.reload));
    watch("src/**/*.js").on("change", series(scripts, server.reload));
}

export const build = series(clean, html, fonts, images, webp, sprite, scss, style, scripts);
export default series(clean, html, fonts, images, webp, sprite, scss, style, scripts, serve);