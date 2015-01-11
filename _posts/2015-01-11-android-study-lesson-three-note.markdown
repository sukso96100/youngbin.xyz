---
layout: post
title: "시온고 안드로이드 스터디 노트 - 3.New Activities And Intents"
date: "2015-01-11"
tags: develop development android app study note
image : /resources/android_study_tshirts.jpg
---

Lesson 2 에 이어 Lesson 3 노트를 계속 합니다. 이번에는 스터디 맴버들이 Udacity 강의와 함께 보면서 공부 할 수 있도록. 일찍 노트를 작성하게 되었습니다.
저번 Lesson 2 에는 갑자기 어려운 내용이 나왔는대. Lesson 3 은 또 조금 쉬운 내용이내요. Udacity 강의가 하나의 앱을 개발하는 과정을 가지고 코스가 짜여있다 보니.
난이도가 들쭉날쭉 한 것 같내요. 이번 Lesson 3 에서는 새로운 Activity 를 만들고, Activity 사이에서 Intent 등을 이용해 통신하는 방법을 주로 다룹니다.

## 시작하기 앞서...
- Lesson 2 는 공부 하였나요? [안했으면 먼저 하고 오시길.](http://www.youngbin-han.kr.pe/2014/12/30/android-study-lesson-two-note.html)
- Lesson 2 에서 작성한 소스코드를 준비하세요.

## Lesson 3 내용 요약.
- OnItemClickListener - ListView 각 항목 클릭 처리
- 새 Activity 생성.
- Intent 에 대해 알아보기.
- 명시적 인텐트 (Explicit Intent) 를 이용해 Activity 이동하기.
- PreferenceActivity 를 이용해 설정화면 만들기.
- 암시적 인텐트 (Implicit Intent) 에 대해 알아보기.
- BroadcastReceiver 와 Intent Filter 에 대해 알아보기.

## OnItemClickListener 로 ListView 각 항목 클릭 처리하기.
OnItemClickListener 를 등룩하여, 각 항목별 클릭을 처리해 봅시다. 일단 지금은, ListView 에서 각 항목을 클릭하면 해당 항목 내용이 Toast 메시지로 나타나도록 해 봅시다.
먼저 OnItemClickListener 를 등룩 해 줍시다.

{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

그리고 Adapter 에서 항목에 해당되는 데이터를 얻어서 Toast 메시지로 표시 해 줍시다. 아래 사진이 Toast 메시지가 나타났을 때 사진입니다. 다들 이미 많이 보셨을 겁니다.
<img src="/resources/toast_message.png"><br>
{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
                String ForecastItem = myAdapter.getItem(position); //항목에 해당되는 데이터 얻기
                Toast.makeText(getActivity(), //Context 는 Activity 로부터 얻습니다.
                                ForecastItem, //Toast 로 표시할 문자열 입니다.
                                Toast.LENGTH_SHORT //Toast 메시지를 얼마나 긴 시간동안 표시할지 정합니다.
                                ).show(); // show() 메서드로 Toast 를 보여줍니다.
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

## Activity 하나 새로 만들기
Activity 를 하나 더 만들어 줍시다. 이 Activity 는 더 자세한 날씨 정보를 표시하는대 사용 할 겁니다.
아래 사진처럼, 패키지 디렉터리를 우클릭해서, 새로운 Activity 를 만들어 주세요. Blank Activity with Fragment 을 선택하여 생성합니다.
<img src="/resources/create_new_blank_activity_with_fragment.png"><br>
이름은 DetailActivity 로 정하고, Hierarchical Parent(계층 부모)는 MainActiity 로 설정하여, 
DetailActivity 의 상위(또는 부모) Activity 가 MainActivity 가 되도록 합시다.
<img src="/resources/new_blank_activity_with_fragment.png"><br>
Activity 를 하나 새로 만들었으나. 아직 우리가 이 Activity 를 실행 하고 있지 않습니다. Intent 를 이용해서 한번 실행해 봅시다.

## Intent
Intent 는 다른 앱 컴포넌트로부터 액션을 하도록 요청하거나(예를 들면 주소록 추가 화면 열기, 웹 브라우저를 열고 특정 웹사이트로 이동) 앱 컴포넌트들 사이에서 통신을 하는대 사용됩니다.
보통 아래와 같은 것들을 하기 위해서 Intent 를 많이 사용 합니다

- Activity 를 시작하기 위해
- Service 를 시작하기 위해 - Service 에 대해서는 추후 더 자세히 다룰 예정.
- Broadcast(방송)을 전달하기 위해

Intent 는 두가지 종류로 나뉩니다.

- Explicit Intent (명시적 인텐트)
>정확한 클래스 이름으로 어떤 앱 컴포넌트를 시작할지, 또는 통신할지 명시적으로 정합니다. 보통 자신이 개발하는 앱에 있는 다른 컴포넌트들을 시작하거나 통신하기 위해 명시적 인텐트를 사용합니다. 당연히 자신이 개발하는 앱 이니, 어떤 앱 컴포넌트가 있는지 앱 컴포넌트 이름은 뭔지 다 알고 있으니까요.

- Implicit Intent (암시적 인텐트)
>정확한 앱 컴포넌트를 명시하지 않습니다. 대신 수행할 일반적인 액션을 정의합니다. 특정 웹페이지를 웹 브라우저 앱에서 열기, 지도 앱에서 사용자 위치 보여주기 등을 예로 들 수 있습니다.

## Explicit Intent 를 사용하여 DetailActivity 시작하기
Explicit Intent 를 이용해 한번 DetailActivity 로 전환해 봅시다.
{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
                String ForecastItem = myAdapter.getItem(position); //항목에 해당되는 데이터 얻기
                //새로운 Intent 객체 만들기
                //getActivity() - Context 는 Activity 에서 얻습니다.
                //DetailFragment.class 대상 앱 컴포넌트 입니다.
                Intent DetailIntent = new Intent(getActivity(), DetailActivity.class);
                startActivity(DetailIntent); // Activity 시작하기
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

## Intent 에 Extra 첨부하기
Intent 를 이용해 통신을 할 때, Extra 를 첨부하여 간단한 데이터를 주고 받을 수 있습니다. DetailActivity에 날씨 정보를 Extra 로 첨부해 보내봅시다.
Intent.putExtra("키 이름", 보낼 데이터); 를 이용해 Extra를 넣고, 나중에 받을 때는 getIntent.getStringExtra() / getIntent.getIntExtra() 등으로 받아서 사용하면 됩니다. 우선 첨부해서 보내 봅시다.
{% highlight java %}
public class WeatherFragment extends Fragment {
...
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ...
        mat.execute("1838716"); //myAsyncTask 실행하기
        //ListView 에 OnItemClickListener 등룩하기.
        LV.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //각 항목 클릭시 실행될 코드를 여기에 입력합니다.
                String ForecastItem = myAdapter.getItem(position); //항목에 해당되는 데이터 얻기
                //새로운 Intent 객체 만들기
                //getActivity() - Context 는 Activity 에서 얻습니다.
                //DetailFragment.class 대상 앱 컴포넌트 입니다.
                Intent DetailIntent = new Intent(getActivity(), DetailActivity.class);
                // 키값은 weather_data, 첨부된 데이터는 String 형태인 ForecastItem 로 하였습니다.
                DetailIntent.putExtra("weather_data", ForecastItem); 
                startActivity(DetailIntent); // Activity 시작하기
            }
        });
        return rootView;
    }
    ...
}
{% endhighlight %}

이제, DetailActivity 에서 받아서 표시해 봅시다. DetailActivity 에서도, Fragment 에 코드를 작성할 겁니다. 마찬가지로 Fragment 의 onCreateView 메서드를 찾아 그곳에 코드를 작성합니다. 받은 Intent 는 Activity 가 가지고 있으므로 getActivity 를 이용해 Intent 를 얻습니다.

우선, 레이아웃 파일에서 날씨 정보를 표시할 TextView 를 작업합시다. 일단 기본적으로 들어가 있는 TextView 에 id 값만 지정해 줍시다.
저는 id 를 weather_data 로 하겠습니다.
{% highlight xml %}
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools" android:layout_width="match_parent"
    android:layout_height="match_parent" android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    android:paddingBottom="@dimen/activity_vertical_margin"
    tools:context="com.youngbin.androidstudy.DetailActivity$PlaceholderFragment">

    <TextView android:text="@string/hello_world" 
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:id="@+id/weather_data"/>

</RelativeLayout>
{% endhighlight %}
그리고 이어서 Java 코드 작업을 해 줍시다.
{% highlight java %}
public class DetailActivity extends ActionBarActivity {
    ...
    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {

        public PlaceholderFragment() {
        }

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {

            View rootView = inflater.inflate(R.layout.fragment_detail, container, false);
            //날씨 정보 표시에 쓸 TextView 찾기           
            TextView WeatherTxt = (TextView)rootView.findViewById(R.id.weather_data);
            //Activity 가 받은 Intent 얻어내어, 같이 Extra 로 온 데이터 얻기
            String WeatherData = getActivity().getIntent().getStringExtra("weather_data");
            //TextView 내용을 얻은 데이터로 설정.
            WeatherTxt.setText(WeatherData);
            return rootView;
        }
    }
}
{% endhighlight %}