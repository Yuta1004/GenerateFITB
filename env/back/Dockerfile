FROM centos:8.2.2004

COPY requirements.txt /home

RUN echo "Step1. Installing Packages" && \
        dnf update -y &&
        dnf upgrade -y &&
        dnf install -y \
            curl-7.61.1-14.el8_3.1 \
            python36-3.6.8-2.module_el8.3.0+562+e162826a \
            mecab-0.996-1.module_el8.2.0+493+63b41e36.9 \
            mecab-ipadic-2.7.0.20070801-16.module_el8.2.0+493+63b41e36 && \
    echo "Step2. Setting Mecab" && \
        echo "dicdir=/usr/lib64/mecab/dic/ipadic" > /usr/local/etc/mecabrc &&\
    echo "Step3. Setting Python3.6" && \
        cd /home && \
        python3.6 -m pip install --upgrade pip && \
         python3.6 -m pip install -r requirements.txt

