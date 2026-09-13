FROM ruby:2.7.0-alpine

WORKDIR /app

RUN apk add --no-cache \
    nodejs \
    curl \
    tzdata \
    libffi-dev \
    cmake \
    gcc \
    alpine-sdk \
    linux-headers \
    git \
    zlib-dev \
    openssl-dev \
    gperf \
    libgcc \
    libstdc++ \
    libx11 \
    glib \
    libxrender \
    libxext \
    libintl \
    postgresql-dev

COPY Gemfile Gemfile.lock* ./

RUN bundle install

COPY . .

EXPOSE 3000

CMD ["bin/rails", "server", "-b", "0.0.0.0"]