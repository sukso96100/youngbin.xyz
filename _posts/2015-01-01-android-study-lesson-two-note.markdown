---
layout: post
title: "시온고 안드로이드 스터디 노트 - 2.Connect Sunshine to the Cloud"
date: "2015-01-01"
tags: develop development android app study note
image : /resources/android_study_lesson_one_cover.jpg
---

안녕하세요. 저번에 Lesson 1 노트에 이어 Lesson 2 내용을 정리하여 포스트로 작성 해 보고자 합니다. 원래는 Lesson 하나가 끝날 떄마다 작성 하려 했는대. 스터디 맴버들이 언어 장벽 문제인지, 그냥 안듣는건지... 미리 Udacity 강의를 듣고 오지를 않아서 이렇게 쓴 노트라도 좀 보라고 이번에는 미리 작성하게 되었습니다. 바로 들어가겠습니다.

## 시작하기 앞서...
- Lesson 1 은 공부 하였나요? [안했으면 먼저 하고 오시길.](http://www.youngbin-han.kr.pe/2014/12/30/android-study-lesson-one-note.html)
- Lesson 2 에서 작성한 소스코드를 준비하세요.
- 매우 당연하게도. 안드로이드 스튜디오가 설치된 컴퓨터를 준비하시길.
- 이 포스트에서 다루기는 하겠지만... InputStream, StringBuffer, Thread 는 미리 공부 하고 오시는 것이 좋습니다.

## Lesson 2 내용들
대략 정리하자면 아래와 같습니다

- OpenWeatherMap API 를 사용해 날시정보 얻기
- HttpURLConnection 으로 HttpRequest 보내고 Reponse 받기
- Log 찍기, Logcat 보기 
- AsyncTask 를 이용하여 Background Thread 돌리기
- JSON 파싱
- Adapter 갱신 + AOSP 소스코드 들여다보기

## OpenWeatherMap API

이번 Lesson 에서는, OpenWeatherMap 이라는 날시 정보를 제공하는 사이트에서 제공하는 API 를 이용하여 나리 정보를 불러올 것 입니다.
우리는 일주일 치 날시 정보를 불러들일 것 입니다. [일단 해당 문서를 한번 읽어봅시다.](http://openweathermap.org/forecast)

<img src="/resources/openweathermap_api_doc.png"><br>

우리는 도시ID 값으로 특정 도시에 해당되는 날시를 찾고, 일주일치 일기예보 정보를 얻을 것이며, JSON 형식으로 데이터를 받을 것입니다. 아 그리고 온도 단위는 섭씨로 해야겠죠?

예를 들어서 앞에서 나온 조건을 만족하는 경기도 부천지역 날시에 해당되는 API의 URL은 어떻게 될까요? 아래와 같습니다.

http://api.openweathermap.org/data/2.5/forecast/daily?id=1838716&units=metric&cnt=7

- forecast/daily? - 하루에 대항 일기예보
- id=1838716 - 도시 ID 값(여기서는 부천시 ID 값 사용)
- units=metric - 단위(metric 주로 유럽 국가에서 쓰는 세계 표준 단위 - cm, m, kg ... / imperial 미국이나 영국 등ㅇ서 사용하는 단위 - miles, feet ...)
- cnt=7 - 일 수(여기서는 7일)

## HttpURLConnection
날시 데이터를 얻어낼 URL 도 있으니, 해당 URL 로 부터 데이터를 로드해 봅시다. HttpURLConnection 을 이용해 요청을 보내서 데이터를 얻을 것입니다.
Lesson 1 에서 작성한 소스를 안드로이드 스튜디오 에서 열고. MainActivity.java 의 Fragment 부분에 위치한 onCreateView 부분에서 이어서 작업합시다.

우선 URL 객체를 하나 만듭시다. 그리고 HttpURLConnection 을 이용해 연결하고, 데이터를 로드합시다.
{% highlight java %}
...
//새 URL 객체
String WeatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=1838716&units=metric&cnt=7";
URL url = new URL(WeatherURL); 
//새 URLConnection
urlConnection = (HttpURLConnection) url.openConnection();
urlConnection.setRequestMethod("GET");
urlConnection.connect();
...
{% endhighlight %}

## InputStream
우리가 몇심 리터의 물을 받을 때 어떻게 받나요? 한 손으로 한번에 받나요? 그것을 불가능 합니다. 그 작은 손으로 어떻게 몇 심 리터의 물을 한번에 받겠습니까.
한 손으로 한번에 받지 않고. 도구를 이용해 조금씩 받습니다. 파이프를 연결해서 흘려받는 것을 예로 들 수 있겠군요.
우리가 로드하는 데이터 또한 한번에 로드 할 수 없습니다. 그래서 InputStream 을 이용하여 데이터를 로드합니다. InputStream 은 여러가지 Stream 중 하나 인대.
Stream 은 데이터를 운반 해 주는 통로 역할을 해 줍니다. 물을 흘려보내는 파이프 역할을 한다고 보면 됩니다. Stream 은 연속적인 데이터 흐름을 물에 비유해서 붙여진 이름인대. 물이 한쪽 방향으로만 흐르듯, Stream 은 하나의 방향으로만 통신이 가능해서. 입력/출력을 동시에 처리할 수 없습니다. 그래서 InputStream, OutputStream 이 따로 있습니다. 우리는 데이터를 입력 받으므로. InputStream 을 사용합니다.
{% highlight java %}
...
HttpURLConnection urlConnection = null; //HttpUrlConnection
//새 URL 객체
String WeatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=1838716&units=metric&cnt=7";
URL url = new URL(WeatherURL); 
//새 URLConnection
urlConnection = (HttpURLConnection) url.openConnection();
urlConnection.setRequestMethod("GET");
urlConnection.connect();
//InputStream 을 사용해 데이터 읽어들이기
InputStream inputStream = urlConnection.getInputStream();
...
{% endhighlight %}

## StringBuffer
StringBuffer 은 문자열인 String 과 매우 유사하지만. 다른 접이 있습니다. String 이 처음에 만들어 질때 저장된 문자열을 바꾸기 어렵지만. StringBuffer 는 쉽게 바꿀 수 있습니다.
{% highlight java %}
...
HttpURLConnection urlConnection = null; //HttpUrlConnection
BufferedReader reader = null;   
//새 URL 객체
String WeatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=1838716&units=metric&cnt=7";
URL url = new URL(WeatherURL); 
//새 URLConnection
urlConnection = (HttpURLConnection) url.openConnection();
urlConnection.setRequestMethod("GET");
urlConnection.connect();
//InputStream 을 사용해 데이터 읽어들이기
InputStream inputStream = urlConnection.getInputStream();
//StringBuffer 에 데이터 저장
StringBuffer buffer = new StringBuffer(); // 새로운 StringBuffer 생성
reader = new BufferedReader(new InputStreamReader(inputStream));
String line;
    while ((line = reader.readLine()) != null) {
        buffer.append(line + "\n");
    }
...
{% endhighlight %}

## 불러온 데이터 문자열 변수에 저장. 오류 예외처리
이제 불러온 데이터는 String 형태의 변수에 저장하고. 불러론 데이터가 비어있어 오류가 나는 경우를 대비하여, 예외처리를 합니다.
{% highlight java %}
...
HttpURLConnection urlConnection = null; //HttpUrlConnection
BufferedReader reader = null;   
String forecastJsonStr = null;
try{
    //새 URL 객체
    String WeatherURL = "http://api.openweathermap.org/data/2.5/forecast/daily?id=1838716&units=metric&cnt=7";
    URL url = new URL(WeatherURL); 
    //새 URLConnection
    urlConnection = (HttpURLConnection) url.openConnection();
    urlConnection.setRequestMethod("GET");
    urlConnection.connect();
    //InputStream 을 사용해 데이터 읽어들이기
    InputStream inputStream = urlConnection.getInputStream();
    //StringBuffer 에 데이터 저장
    StringBuffer buffer = new StringBuffer(); // 새로운 StringBuffer 생성
    reader = new BufferedReader(new InputStreamReader(inputStream));
    String line;
    while ((line = reader.readLine()) != null) {
        buffer.append(line + "\n");
            }
            if (buffer.length() == 0) {
        // 불러온 데이터가 비어있음.
        forecastJsonStr = null;
    }
    forecastJsonStr = buffer.toString(); //로드한 데이터 문자열 변수에 저장.
        }catch(IOException e){
        forecastJsonStr = null;
        }finally{
             if (urlConnection != null) {
            urlConnection.disconnect(); //HttpURLConnection 연결 끊기
            }
            if (reader != null) {
                try {
                    reader.close();
                    } catch (final IOException e) {
                }
            }
        }
...
{% endhighlight %}

## Log 찍기
오류가 나는 경우 그에 대한 더 자세한 정보를 얻기 위해. Log 가 찍히도록 코드를 작성해 봅시다. 아래와 같은 형태의 Log 를 찍을 수 있습니다.

- Error(오류)
- Warn(경고)
- Info(정보)
- Debug(디버그)
- Verbose(일반적인 정보)

아래와 같은 코드로 Log 를 찍을 수 있습니다.
{% highlight java %}

Log.e("로그", "오류 발생"); 
Log.w("로그", "경고!"); 
Log.i("로그", "새로운 정보!"); 
Log.d("로그", "디버깅 결과"); 
Log.v("로그", "일반적인 정보");
{% endhighlight %}

## Logcat 보기
여기까지 작성한 앱을 한번 실행 해 봅시다. 앱이 강제 종료 되지 않나요? 그것이 정상 입니다. Logcat을 확인해서 출력된 Log들을 살펴 봅시다.
<img src="/resources/networkonmain.png"><br>

보통, Run 버튼을 눌러 앱을 테스트 하면, 자동으로 하단에 Android DDMS 가 나타나고, 그곳에 Logcat 이 나타납니다. Run 버튼과 같은 줄에 위치한 Android Device Monitor(안드로이드 마스코드 모양의 버튼)에서도 Logcat 확인이 가능합니다. 
<img src="/resources/check_logcat.png"><br>

Logcat 을 한번 확인 해 봅시다.
<pre>
01-02 00:01:33.119    4099-4099/com.youngbin.androidstudy D/AndroidRuntime﹕ Shutting down VM
01-02 00:01:33.127    4099-4099/com.youngbin.androidstudy E/AndroidRuntime﹕ FATAL EXCEPTION: main
    Process: com.youngbin.androidstudy, PID: 4099
    java.lang.RuntimeException: Unable to start activity ComponentInfo{com.youngbin.androidstudy/com.youngbin.androidstudy.MainActivity}: android.os.NetworkOnMainThreadException
            at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2298)
            at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2360)
            at android.app.ActivityThread.access$800(ActivityThread.java:144)
            at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1278)
            at android.os.Handler.dispatchMessage(Handler.java:102)
            at android.os.Looper.loop(Looper.java:135)
            at android.app.ActivityThread.main(ActivityThread.java:5221)
            at java.lang.reflect.Method.invoke(Native Method)
            at java.lang.reflect.Method.invoke(Method.java:372)
            at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:899)
            at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694)
     Caused by: android.os.NetworkOnMainThreadException
            at android.os.StrictMode$AndroidBlockGuardPolicy.onNetwork(StrictMode.java:1147)
            at java.net.InetAddress.lookupHostByName(InetAddress.java:418)
            at java.net.InetAddress.getAllByNameImpl(InetAddress.java:252)
            at java.net.InetAddress.getAllByName(InetAddress.java:215)
            at com.android.okhttp.HostResolver$1.getAllByName(HostResolver.java:29)
            at com.android.okhttp.internal.http.RouteSelector.resetNextInetSocketAddress(RouteSelector.java:232)
            at com.android.okhttp.internal.http.RouteSelector.next(RouteSelector.java:124)
            at com.android.okhttp.internal.http.HttpEngine.connect(HttpEngine.java:272)
            at com.android.okhttp.internal.http.HttpEngine.sendRequest(HttpEngine.java:211)
            at com.android.okhttp.internal.http.HttpURLConnectionImpl.execute(HttpURLConnectionImpl.java:373)
            at com.android.okhttp.internal.http.HttpURLConnectionImpl.connect(HttpURLConnectionImpl.java:106)
            at com.youngbin.androidstudy.MainActivity$PlaceholderFragment.onCreateView(MainActivity.java:94)
            at android.support.v4.app.Fragment.performCreateView(Fragment.java:1786)
            at android.support.v4.app.FragmentManagerImpl.moveToState(FragmentManager.java:947)
            at android.support.v4.app.FragmentManagerImpl.moveToState(FragmentManager.java:1126)
            at android.support.v4.app.BackStackRecord.run(BackStackRecord.java:739)
            at android.support.v4.app.FragmentManagerImpl.execPendingActions(FragmentManager.java:1489)
            at android.support.v4.app.FragmentActivity.onStart(FragmentActivity.java:548)
            at android.app.Instrumentation.callActivityOnStart(Instrumentation.java:1220)
            at android.app.Activity.performStart(Activity.java:5949)
            at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2261)
            at android.app.ActivityThread.handleLaunchActivity(ActivityThread.java:2360)
            at android.app.ActivityThread.access$800(ActivityThread.java:144)
            at android.app.ActivityThread$H.handleMessage(ActivityThread.java:1278)
            at android.os.Handler.dispatchMessage(Handler.java:102)
            at android.os.Looper.loop(Looper.java:135)
            at android.app.ActivityThread.main(ActivityThread.java:5221)
            at java.lang.reflect.Method.invoke(Native Method)
            at java.lang.reflect.Method.invoke(Method.java:372)
            at com.android.internal.os.ZygoteInit$MethodAndArgsCaller.run(ZygoteInit.java:899)
            at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694)
</pre>

우리가 작성한 코드의 네트워크 통신 부분에서 오류가 발생했군요. NetworkOnMainThreadException 오류가 발생했습니다. 우리가 네트워크 작업이 Main Thread 에서 실행되도록 작성해서 그렇습니다. 이를 해결하기 위해, Thread 에 대해서 알아봅시다.
<pre>
    ...
    Process: com.youngbin.androidstudy, PID: 4099
    java.lang.RuntimeException: Unable to start activity ComponentInfo{com.youngbin.androidstudy/com.youngbin.androidstudy.MainActivity}: android.os.NetworkOnMainThreadException
            at android.app.ActivityThread.performLaunchActivity(ActivityThread.java:2298)
            ...
            at com.android.internal.os.ZygoteInit.main(ZygoteInit.java:694)
     Caused by: android.os.NetworkOnMainThreadException
            at android.os.StrictMode$AndroidBlockGuardPolicy.onNetwork(StrictMode.java:1147)
            ...
            at com.android.okhttp.internal.http.HttpURLConnectionImpl.connect(HttpURLConnectionImpl.java:106)
            at com.youngbin.androidstudy.MainActivity$PlaceholderFragment.onCreateView(MainActivity.java:94)
            at android.support.v4.app.Fragment.performCreateView(Fragment.java:1786)
            at android.support.v4.app.FragmentManagerImpl.moveToState(FragmentManager.java:947)
            ...
</pre>

## Thread
어떤 프로그램 또는 프로세스 내부에서 실행이 되는 흐름의 단위를 말합니다. 필요에 따하 둘 이상의 Thread 를 실행 시킬수도 있는대 이러한 실행 방식을 Multithread 하며, 둘 이상의 Thread 를 다루는 것을 보고, MultiThreading 이라고 합니다. 안드로이드 앱 에서는 기본적으로 사용자로 부터의 입력 및 출력을 처리해 주는 UI Thread 가 있습니다. Main Thread 라고도 부릅니다. UI Thread 는 버튼 클릭, 화면 드래그 등의 간단하고 짧은 작업들을 수행합니다. 그런대 여기서 네트워크 작업을 실행하게 되면. 네트워크 작업을 일단 마쳐야 하기 떄문에, 만약 네트워크 작업이 오래 걸리면 사용자로 부터의 입력과 출력 등을 처리하지 못하게 됩니다. 사용자 입장에서는 앱이 먹통인 것으로 보입니다. 그러므로 안드로이드 3.0 부터는 이렇게 작동되면 오류로 처리가 되어 버립니다. 우리는 네트워크 작업을 별도 Thread 에서 실행되도록 할 건대. AsyncTask 를 이용하여 구현 할 것입니다.
<img src="/resources/multithreading.png"><br>


## AsyncTask
AsyncTask 는 백그라운드 작업을 쉽게 실행 할 수 있도록, 그리고 결과를 UI Thread 로 쉽게 넘길 수 있도록 해줍니다.
AsyncTask 에는 4가지 메서드가 있습니다. 백그라운드 작업 전에 실행되는 onPreExecute(), 백그라운드 작업을 실행하는 doInBackground(Params...), 중간에 진행 정도를 UI Thread 에 넘겨주는 onProgressUpdate(Progress...), 백그라운드 작업이 끝나고 실행되며 결과를 Ui Thread 로 넘기는 onPostExecute(Result) 가 있습니다. 

AsyncTask 를 구현 할 때는, AsncTask 를 상속받는 클래스로 구현합니다.
{% highlight java %}
private class myAsyncTask extends AsyncTask<실행시 받을 매개변수 타입, 진행 현황 변수 타입, 완료시 반환할 변수 타입>{ 
    protected void onPreExecute() { 
    // 백그라운드 작업 전에 Main Thread 에 실행 
        } 
    protected void doInBackground(Params... params) { 
    //백그라운드 작업 실행 } 
    protected void onProgressUpdate(Progress... progress) { 
    //도중에 진행 정도 변경 시 Main Thread 에서 실행 
    publishProgress(progress); 
        } 
    protected void onPostExecute(Result result) { 
    //백그라운드 작업 후 실행 
        }
    }
{% endhighlight %}