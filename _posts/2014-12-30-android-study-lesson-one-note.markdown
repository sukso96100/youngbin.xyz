---
layout: post
title: "시온고 안드로이드 스터디 노트 - 1.Create Project Sunshine"
date: "2014-12-30"
categories: develop development android app study note
---

몇 주 전 부터 교내에서 친구 몇명 모아서 안드로이드 스터디를 하고 있습니다. 구글 코드아 측에서 스터디 그룹 프로그램을 해서 해 보게 되었는대. 2차 지필평가로 인해 진도가 많이 밀렸습니다. Udacity(udacity.com) 에 있는 Developing Android Apps코스를 기반으로 진행 중입니다. 7~8개의 레슨으로 구성 되어 있는대. 레슨 하나가 마무리 될 때마다. 이렇게 글로 정리를 해 보고자 합니다. 한참 진도가 늦습니다만... 일단 드디어 레슨 1 을 마무리 했으므로. 레슨 1 을 정리해 보고자 합니다.

## 레슨 1 의 내용들
레슨 1 은 대략 아래와 같은 내용으로 구성되어 있습니다. 하나씩 자세히 알아봅시다. 스터디 에서는 가장 처음에 Git에 대해서도 다뤘고, 간단히 안드로이드 플랫폼에 대한 설명도 했었으나, Git 사용법은 검색 좀 해보면 나오고, 안드로이드가 뭔지는 다들 알기 떄문에 이 글에서는 생략 하겠습니다.

- JDK, 안드로이드 스튜디오 설치
- 필요한 SDK 도구 받기, 프로젝트 생성, 테스트 하기
- View 를 배치하여 간단한 UI 만들기
- Layout (FrameLayout, RelativeLayout, LinearLayout)
- ListView 와 Adapter

## JDK 설치하기
안드로이드 앱을 Java 로 작성하고. 우리가 안드로이드 앱 개발에 사용할 도구가 JDK를 유구하기에. 우선, JDK를 설치 하여야 합니다.

### JDK 설치파일 다운로드
Ubuntu, Arch Linux 계열 리눅스를 사용하시면, 이 부분을 건너 뛰세요.

- [Oracle](http://oracle.com)웹사이트에 접속하세요.
- Downloads 메뉴에 마우스를 올리면, 다양한 하위 메뉴가 나타나는대. 좌측에 있는 Popular Downloads 섹션에 있는 Java for Developers 를 선택합니다.
- JDK 항목을 선택합니다
- Java SE Development Kit 섹션에서 다운로드 받습니다. 먼저 Accept License Agreement 를 클릭하여, 라이선스에 동의하고, 자신의 시스템에 맞는 것으로 다운로드 합니다.

### Winidows
- 다운로드 받은 설치 파일을 실행하여, 설치 마법사의 안내에 따라 설치를 진행합니다.

### Linux - RPM 패키지 사용 하는경우
- 다운로드 받은 RPM 파일을 아래 명령어를 사용하여 설치하거나, GUI 기반의 패키지 설치 프록램이 있다면, 그냥 클릭해서 설치합니다.
{% highlight bash %}
# "<파일이름>" 은 다운로드 받은 파일의 이름으로 합니다
sudo rpm -i <파일이름>
# 명령어 예시 : sudo rpm -i jdk-8u25-linux-x64.rpm
{% endhighlight %}

### Linux - Ubuntu 계열
터미널에서 다음 명령어로, WebUpd8 JDK 저장소를 추가하고, 설치를 진행합니다.(아래 명령어는 JDK8을 설치합니다)
{% highlight bash %}
sudo add-aptt-repository ppa:webupd8team/java
sudo apt-get update
sudo apt-get install oracle-java8-installer
{% endhighlight %}

### Linux - Arch Linux 계열
간단히 AUR에서 받아다 설치합니다. 아래 명령어를 실행하세요.
{% highlight bash %}
yaourt -S jdk
{% endhighlight %}

### Linux - 그 외 배포판
- 먼저 루트 권한이 필요합니다. 루트로 전환하거나. 매번 명령어 앞에 sudo 를 붙여서 실행하세요. 여기에서를 루트로 전환하여 하는 방법을 소개합니다. 아래 명령어로, 루트로 전환합니다.
{% highlight bash %}
sudo -i
{% endhighlight %}
- JDK를 설치할 디렉터리에 접근합니다. 예를들어, /usr/java/ 라면. 아래 명령어를 실행하여 접근합니다
{% highlight bash %}
cd /usr/java/
{% endhighlight %}
- 다운로드한 *.tar.gz 파일을 지금 접근중인 경로로 옮기거나 복사합니다. 여기에서는 복사합니다.
{% highlight bash %}
cp (*.tar.gz 파일의 상위 경로)/(해당 파일 이름).tar.gz (해당 파일 이름).tar.gz 
{% endhighlight %}
- 압축을 해제합니다.
{% highlight bash %}
tar zxvf
{% endhighlight %}

## JAVA_HOME, Path 변수 설정하기.
Java 로 작성된 프로그램을 실행하기 위해, JAVA_HOME 변수와, Path 변수를 설정해 주어야 합니다.

### Windows
- 제어판 > 시스템 으로 이동하고, 좌측에서 "고급 시스템 설정"을 누릅니다.
- 새로 열리는 "시스템 속성" 창에서 "고급" 탭으로 이동합니다.
- 하단에 위치한 "환경 변수" 눌러서, 환경 변수 설정창을 엽니다.
- 사용자 변수나 시스템 변수 섹션에 JAVA_HOME 이 이미 있으면, 지우고 "새로 만들기" 를 클릭하여 새로 생성합니다.
- 변수 이름은 JAVA_HOME, 변수 값은 JDK 경로로 합니다 (예 : C:\Program Files\Java\jdk1.7.0_11)
- 시스템 변수 섹션에서 Path 를 찾아보세요. 있으면 편집하고, 없으면 새로 생성하세요.
- 변수 이름은 Path, 변수 값은 ;%JAVA_HOME%bin; 를 입력합니다. 이미 값이 다른 것이 있다면, 가장 뒤에 추가합니다.

### Linux
먼저 프로필 파일을 텍스트 에디터로 열어주세요. 
{% highlight bash %}
# "gedit" 은 텍스트 에디터 이름 입니다. 
# 다른 텍스트 에디터 사용시 gedit 대신 해당 에디터 이름을 입력하세요.

# 사용중인 계정에 대해서만 설정 할 경우
gedit ~/.bash_profile
# 시스템 전체적으로 설정 할 경우
# (시스템 영역에 접근하여 파일 수정시, 루트 권한이 필요하므로, 앞에 sudo를 붙입니다.)
sudo gedit /etc/profile
{% endhighlight %}

에디터로 열었으면, 가장 아래에 다음을 추가 하세요.
{% highlight bash %}
# <JDK경로>는 여러분의 시스템에 JDK 가 설치된 경로로 하시면 됩니다.
export JAVA_HOME=<JDK경로>
# 예시 : export JAVA_HOME=/usr/java/jdk1.8.0_25
export PATH=$JAVA_HOME/bin:$PATH
{% endhighlight %}

다 했으면, 저장하고 에디터를 닫습니다. 그리고 아래 명령어로 설정한 것을 적용 시키세요.

{% highlight bash %}
# 사용중인 계정에 대해서만 설정 한 경우
source ~/.bash_profile
# 시스템 전체적으로 설정 한 경우
source /etc/profile
{% endhighlight %}

### JDK 작동여부 확인
아래 명령어를 실행하여 확인합니다.
{% highlight bash %}
java -version
{% endhighlight %}

## Android Studio 설치
http://developer.android.com/sdk/index.html
위 URL 에 접속하여 Android Studio 를 다운로드 하세요.

- Windows 는, 다운로드 받은 것을 실행하여, 설치 마법사에 따라 설치를 진행합니다
- Linux 에서는, 다운로드 반은 파일 압축을 풀고, bin 폴더 안의 studio.sh 를 실행하세요.

## 필요한 SDK 도구 설치
앱 개발 및 빌드에 필요한 각종 API 패키지나 빌드툴 등을 SDK Manager 를 통해 다운로드 합시다.

- Android Studio 를 처음 실행 하시는 경우, Welcome to Android Studio 창이 나타납니다.
- Configure > SDK Manager 항목으로 들어가서 SDK Manager 를 켭니다.
- 필요한 항목을 선택하여 다운로드 합니다. 보통 최신 버전의 안드로이드 버전에 해당되는 항목과 Extra 항목을 다운로드 받습니다.
- Install ** packages 버튼 (**는 선택한 항목 수)을 클릭하여 설치합니다.
- 완료되면, SDK Manager 를 닫고, Welcome to Android Studio 창에서 상위 목록으로 이동합니다.

## 새로운 프로젝트 생성
이제 프로젝트를 하나 새롭게 생성 해 봅시다. 생성 과정 중에 Minimum SDK, Target SDK, Package Name 등을 정하게 됩니다.

- Welcome to Android Studio 화면에서 Start a new Android Studio project 를 선택합니다.
- Application name 에 원하는 앱 이름을, Package name 에 원하시는 앱의 Package name을, Project location 에는 프로젝트를 어디에 둘지 경로를 설정합니다. 프로젝트 경로는 영어로만 이뤄져 있어야 합니다.

### Package Name 정하기
- Package Name 은 각 앱의 고유한 이름으로, 다른 앱과 구별하는대 사용됩니다.
- 보통 회사 도메인(Company domain)을 거꾸로 하여 사용합니다.
- 다른 앱의 것과 중복 될 수 없읍니다. 
Package Name 예시 : Company domain 이 example.com 이고, 앱 이름이 appname 이면, Package Name 은 com.example.appname

- 다음 화면으로 넘어가서 어떤 디바이스를 위한 앱을 개발할지 선택하고, Minimum SDK 를 지정합니다. 이 글에서는 휴대전화/태블릿 앱을 개발한다고 보고 Phone and Tablet 만 선택하고 Minimum SDK 를 선택하겠습니다.

### Minimum SDK, Target SDK
- Minimum SDK 와 Target SDK 는 앱이 실행할수 있는 안드로이드 버전을 나타냅니다.
- Minimum SDK : 앱이 동작하기 위해서 필요한 최소 버전을 의미합니다.
- Target SDK : 앱의 동작이 확인된 최신의 안드로이드 버전을 의미합니다. 보통 가장 최근 출시된 안드로이드 버전으로 설정합니다.
